-- Migration: 009_triggers.sql
-- Description: Auto-notification triggers for SHEED
-- Created: 2026-01-23

-- ================================================
-- 1. TRIGGER: Notify Sheedés when new Sheed is created
-- ================================================

-- Function to notify both sheedés when a new sheed is created
CREATE OR REPLACE FUNCTION notify_new_sheed()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert notification for sheede_1
  INSERT INTO notifications (user_id, type, title, body, data)
  VALUES (
    NEW.sheede_1_id,
    'new_sheed',
    'Nouveau Sheed! 💕',
    'Quelqu''un veut te présenter à une personne!',
    jsonb_build_object(
      'sheed_id', NEW.id,
      'sheeder_id', NEW.sheeder_id
    )
  );

  -- Insert notification for sheede_2
  INSERT INTO notifications (user_id, type, title, body, data)
  VALUES (
    NEW.sheede_2_id,
    'new_sheed',
    'Nouveau Sheed! 💕',
    'Quelqu''un veut te présenter à une personne!',
    jsonb_build_object(
      'sheed_id', NEW.id,
      'sheeder_id', NEW.sheeder_id
    )
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on sheeds table for new sheed notifications
DROP TRIGGER IF EXISTS trigger_notify_new_sheed ON sheeds;
CREATE TRIGGER trigger_notify_new_sheed
  AFTER INSERT ON sheeds
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_sheed();

-- ================================================
-- 2. TRIGGER: Check message count threshold for success
-- ================================================

-- Function to check if sheed reached 50 messages (success threshold)
CREATE OR REPLACE FUNCTION check_sheed_success()
RETURNS TRIGGER AS $$
DECLARE
  sheed_record RECORD;
  current_message_count INTEGER;
BEGIN
  -- Get the sheed for this chatroom
  SELECT s.* INTO sheed_record
  FROM sheeds s
  JOIN chatrooms c ON c.sheed_id = s.id
  WHERE c.id = NEW.chatroom_id;

  -- If no sheed found or already success, skip
  IF sheed_record IS NULL OR sheed_record.status = 'success' THEN
    RETURN NEW;
  END IF;

  -- Count total messages in sheede_sheede chatroom only
  SELECT COUNT(*) INTO current_message_count
  FROM messages m
  JOIN chatrooms c ON c.id = m.chatroom_id
  WHERE c.sheed_id = sheed_record.id
    AND c.type = 'sheede_sheede';

  -- Check if threshold reached (50 messages)
  IF current_message_count >= 50 THEN
    -- Update sheed status to success
    UPDATE sheeds
    SET status = 'success', updated_at = NOW()
    WHERE id = sheed_record.id;

    -- Update user stats for sheeder
    UPDATE users
    SET successful_sheeds = successful_sheeds + 1
    WHERE id = sheed_record.sheeder_id;

    -- Notify sheeder of success
    INSERT INTO notifications (user_id, type, title, body, data)
    VALUES (
      sheed_record.sheeder_id,
      'sheed_success',
      'Sheed réussi! 🎉',
      'Félicitations! Les deux Sheedé(e)s ont échangé plus de 50 messages!',
      jsonb_build_object(
        'sheed_id', sheed_record.id,
        'message_count', current_message_count
      )
    );

    -- Notify sheede_1 of success
    INSERT INTO notifications (user_id, type, title, body, data)
    VALUES (
      sheed_record.sheede_1_id,
      'sheed_success',
      'Connexion réussie! 🎉',
      'Vous avez échangé plus de 50 messages! Le Sheed est un succès!',
      jsonb_build_object(
        'sheed_id', sheed_record.id,
        'message_count', current_message_count
      )
    );

    -- Notify sheede_2 of success
    INSERT INTO notifications (user_id, type, title, body, data)
    VALUES (
      sheed_record.sheede_2_id,
      'sheed_success',
      'Connexion réussie! 🎉',
      'Vous avez échangé plus de 50 messages! Le Sheed est un succès!',
      jsonb_build_object(
        'sheed_id', sheed_record.id,
        'message_count', current_message_count
      )
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on messages table for success check
DROP TRIGGER IF EXISTS trigger_check_sheed_success ON messages;
CREATE TRIGGER trigger_check_sheed_success
  AFTER INSERT ON messages
  FOR EACH ROW
  EXECUTE FUNCTION check_sheed_success();

-- ================================================
-- 3. TRIGGER: Notify when sheed is about to expire
-- ================================================

-- Note: Expiry notifications are typically handled by a scheduled job (cron)
-- rather than a trigger, since triggers only fire on data changes.
-- This function can be called by a scheduled job via pg_cron or Supabase Edge Function.

CREATE OR REPLACE FUNCTION notify_expiring_sheeds()
RETURNS INTEGER AS $$
DECLARE
  expiring_sheed RECORD;
  notification_count INTEGER := 0;
BEGIN
  -- Find sheeds expiring in the next 24 hours that are still pending/active
  FOR expiring_sheed IN
    SELECT *
    FROM sheeds
    WHERE status IN ('pending', 'active')
      AND expires_at BETWEEN NOW() AND NOW() + INTERVAL '24 hours'
      AND NOT EXISTS (
        SELECT 1 FROM notifications n
        WHERE n.data->>'sheed_id' = sheeds.id::TEXT
          AND n.type = 'sheed_expired'
          AND n.created_at > NOW() - INTERVAL '24 hours'
      )
  LOOP
    -- Notify sheeder
    INSERT INTO notifications (user_id, type, title, body, data)
    VALUES (
      expiring_sheed.sheeder_id,
      'sheed_expired',
      'Sheed expire bientôt! ⏰',
      'Ton Sheed expire dans moins de 24h!',
      jsonb_build_object('sheed_id', expiring_sheed.id)
    );

    -- Notify sheedés if pending (they haven't responded yet)
    IF expiring_sheed.status = 'pending' THEN
      INSERT INTO notifications (user_id, type, title, body, data)
      VALUES (
        expiring_sheed.sheede_1_id,
        'sheed_expired',
        'Sheed expire bientôt! ⏰',
        'Un Sheed en attente expire dans moins de 24h. Réponds vite!',
        jsonb_build_object('sheed_id', expiring_sheed.id)
      );

      INSERT INTO notifications (user_id, type, title, body, data)
      VALUES (
        expiring_sheed.sheede_2_id,
        'sheed_expired',
        'Sheed expire bientôt! ⏰',
        'Un Sheed en attente expire dans moins de 24h. Réponds vite!',
        jsonb_build_object('sheed_id', expiring_sheed.id)
      );
    END IF;

    notification_count := notification_count + 1;
  END LOOP;

  RETURN notification_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ================================================
-- 4. TRIGGER: Notify on sheed acceptance/decline
-- ================================================

CREATE OR REPLACE FUNCTION notify_sheed_response()
RETURNS TRIGGER AS $$
BEGIN
  -- Only process if status changed to active or declined
  IF OLD.status = 'pending' AND NEW.status = 'active' THEN
    -- Both accepted - notify sheeder
    INSERT INTO notifications (user_id, type, title, body, data)
    VALUES (
      NEW.sheeder_id,
      'sheed_accepted',
      'Sheed accepté! 💫',
      'Les deux Sheedé(e)s ont accepté! Ils peuvent maintenant discuter!',
      jsonb_build_object('sheed_id', NEW.id)
    );
  ELSIF OLD.status = 'pending' AND NEW.status = 'declined' THEN
    -- Someone declined - notify sheeder
    INSERT INTO notifications (user_id, type, title, body, data)
    VALUES (
      NEW.sheeder_id,
      'sheed_declined',
      'Sheed décliné 😔',
      'Un(e) des Sheedé(e)s a décliné le Sheed.',
      jsonb_build_object('sheed_id', NEW.id)
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on sheeds table for response notifications
DROP TRIGGER IF EXISTS trigger_notify_sheed_response ON sheeds;
CREATE TRIGGER trigger_notify_sheed_response
  AFTER UPDATE OF status ON sheeds
  FOR EACH ROW
  WHEN (OLD.status IS DISTINCT FROM NEW.status)
  EXECUTE FUNCTION notify_sheed_response();

-- ================================================
-- Grant execute permissions for scheduled function
-- ================================================

GRANT EXECUTE ON FUNCTION notify_expiring_sheeds() TO service_role;
