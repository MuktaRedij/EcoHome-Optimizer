#!/usr/bin/env python3
import os

file_path = 'energy-ui/src/components/ScenarioComparisonCard.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the escape sequences
content = content.replace(r'\"', '"')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Fixed {file_path}")
