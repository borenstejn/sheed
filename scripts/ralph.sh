#!/bin/bash
# ============================================================
# RALPH WIGGUM LOOP - SHEED Development Orchestrator
# ============================================================
# Based on Geoffrey Huntley's original bash loop technique
# https://ghuntley.com/ralph/
#
# This script orchestrates Claude Code to build SHEED autonomously.
# It runs Claude in a loop, auto-commits progress, and includes
# safeguards (circuit breaker, max iterations).
#
# Usage:
#   chmod +x scripts/ralph.sh
#   ./scripts/ralph.sh
#
# ============================================================

set -e

# Configuration
MAX_ITERATIONS=200
MAX_CONSECUTIVE_FAILURES=5
SLEEP_BETWEEN_ITERATIONS=3
LOG_FILE="ralph.log"
PROGRESS_FILE="progress.txt"
COMPLETION_MARKER="SHEED_MVP_COMPLETE"

# State
ITERATION=0
FAILURES=0
START_TIME=$(date +%s)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ============================================================
# Functions
# ============================================================

print_header() {
    echo ""
    echo -e "${BLUE}============================================================${NC}"
    echo -e "${BLUE}  RALPH WIGGUM LOOP - SHEED Development${NC}"
    echo -e "${BLUE}============================================================${NC}"
    echo ""
    echo "  Max iterations: $MAX_ITERATIONS"
    echo "  Circuit breaker: $MAX_CONSECUTIVE_FAILURES consecutive failures"
    echo "  Log file: $LOG_FILE"
    echo ""
}

print_iteration() {
    local iter=$1
    local max=$2
    local elapsed=$(( $(date +%s) - START_TIME ))
    local hours=$((elapsed / 3600))
    local minutes=$(((elapsed % 3600) / 60))

    echo ""
    echo -e "${YELLOW}------------------------------------------------------------${NC}"
    echo -e "${YELLOW}  Iteration $iter / $max  (Runtime: ${hours}h ${minutes}m)${NC}"
    echo -e "${YELLOW}------------------------------------------------------------${NC}"
}

check_completion() {
    if grep -q "$COMPLETION_MARKER" "$PROGRESS_FILE" 2>/dev/null; then
        return 0
    fi
    return 1
}

check_git_changes() {
    if [ -z "$(git status --porcelain)" ]; then
        return 1  # No changes
    fi
    return 0  # Has changes
}

auto_commit() {
    local iter=$1
    local timestamp=$(date '+%Y-%m-%d %H:%M')

    git add -A

    # Get last completed task from progress.txt
    local last_task=$(grep -E "^\[" "$PROGRESS_FILE" | tail -1 | sed 's/.*\] \([A-Z]*-[0-9]*\):.*/\1/' 2>/dev/null || echo "WIP")

    git commit -m "Ralph iteration $iter - $last_task ($timestamp)" \
        --author="Ralph Wiggum <ralph@sheed.app>" \
        2>/dev/null || true

    echo -e "${GREEN}  Committed changes for iteration $iter${NC}"
}

run_claude() {
    # Run Claude Code with the PROMPT.md content
    # The --print flag outputs the result without interactive mode
    echo ""
    echo "  Running Claude Code..."
    echo ""

    # Pipe PROMPT.md to Claude and capture output
    cat PROMPT.md | claude --print 2>&1 | tee -a "$LOG_FILE"

    return ${PIPESTATUS[0]}
}

print_summary() {
    local status=$1
    local elapsed=$(( $(date +%s) - START_TIME ))
    local hours=$((elapsed / 3600))
    local minutes=$(((elapsed % 3600) / 60))
    local seconds=$((elapsed % 60))

    echo ""
    echo -e "${BLUE}============================================================${NC}"
    echo -e "${BLUE}  RALPH SUMMARY${NC}"
    echo -e "${BLUE}============================================================${NC}"
    echo ""
    echo "  Status: $status"
    echo "  Total iterations: $ITERATION"
    echo "  Total runtime: ${hours}h ${minutes}m ${seconds}s"
    echo "  Log file: $LOG_FILE"
    echo ""

    # Count completed tasks
    if [ -f "prd.json" ]; then
        local completed=$(grep -c '"passes": true' prd.json 2>/dev/null || echo "0")
        local total=$(grep -c '"passes":' prd.json 2>/dev/null || echo "49")
        echo "  Tasks completed: $completed / $total"
    fi
    echo ""
}

# ============================================================
# Pre-flight checks
# ============================================================

# Check we're in the right directory
if [ ! -f "PROMPT.md" ]; then
    echo -e "${RED}Error: PROMPT.md not found. Run this script from the SHEED project root.${NC}"
    exit 1
fi

if [ ! -f "prd.json" ]; then
    echo -e "${RED}Error: prd.json not found. Run this script from the SHEED project root.${NC}"
    exit 1
fi

# Check Claude is installed
if ! command -v claude &> /dev/null; then
    echo -e "${RED}Error: Claude Code CLI not found. Install with: npm install -g @anthropic-ai/claude-code${NC}"
    exit 1
fi

# Check git is initialized
if [ ! -d ".git" ]; then
    echo -e "${RED}Error: Git not initialized. Run 'git init' first.${NC}"
    exit 1
fi

# Initialize log file
echo "Ralph Wiggum Loop Started - $(date)" > "$LOG_FILE"

# ============================================================
# Main Loop
# ============================================================

print_header

while [ $ITERATION -lt $MAX_ITERATIONS ]; do
    ITERATION=$((ITERATION + 1))

    print_iteration $ITERATION $MAX_ITERATIONS

    # Check for completion marker
    if check_completion; then
        echo ""
        echo -e "${GREEN}  MVP COMPLETE! Found $COMPLETION_MARKER in progress.txt${NC}"
        print_summary "SUCCESS - MVP Complete"
        exit 0
    fi

    # Run Claude
    run_claude
    CLAUDE_EXIT_CODE=$?

    # Check if Claude made any changes
    if check_git_changes; then
        echo ""
        echo -e "${GREEN}  Changes detected!${NC}"
        FAILURES=0
        auto_commit $ITERATION
    else
        FAILURES=$((FAILURES + 1))
        echo ""
        echo -e "${YELLOW}  No changes detected ($FAILURES/$MAX_CONSECUTIVE_FAILURES)${NC}"
    fi

    # Circuit breaker
    if [ $FAILURES -ge $MAX_CONSECUTIVE_FAILURES ]; then
        echo ""
        echo -e "${RED}  CIRCUIT BREAKER TRIGGERED${NC}"
        echo -e "${RED}  $MAX_CONSECUTIVE_FAILURES consecutive iterations with no changes.${NC}"
        echo -e "${RED}  Human intervention required.${NC}"
        print_summary "STOPPED - Circuit Breaker"
        exit 1
    fi

    # Rate limiting
    echo ""
    echo "  Waiting ${SLEEP_BETWEEN_ITERATIONS}s before next iteration..."
    sleep $SLEEP_BETWEEN_ITERATIONS
done

# Max iterations reached
echo ""
echo -e "${YELLOW}  Max iterations ($MAX_ITERATIONS) reached.${NC}"
print_summary "STOPPED - Max Iterations"
exit 0
