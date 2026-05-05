#!/bin/bash
echo "=== Project Context ==="
echo "Branch: $(git branch --show-current)"
echo "Last commit: $(git log -1 --format='%s (%ar)')"
echo "Modified files: $(git diff --name-only | wc -l | tr -d ' ') files"
echo "Test status: $(npm test 2>&1 | tail -1)"
echo "======================"
