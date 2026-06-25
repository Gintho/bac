#!/usr/bin/env bash
# data-sync-check.sh
# Vérifie si de nouveaux fichiers sont apparus dans data/ depuis le dernier run
# du cockpit, et suggère de relancer l'agent pmo-cockpit si oui.
# A configurer dans .claude/settings.json comme hook "on session start"
# ou "on file change" selon le support de ta version de Claude Code.

set -euo pipefail

DATA_DIR="$(dirname "$0")/../../data"
STAMP_FILE="$(dirname "$0")/../.last-cockpit-run"

if [ ! -d "$DATA_DIR" ]; then
  exit 0
fi

LATEST_FILE=$(find "$DATA_DIR" -type f \( -name "*.csv" -o -name "*.xlsx" -o -name "*.json" \) -newer "$STAMP_FILE" 2>/dev/null | head -n 1 || true)

if [ -n "$LATEST_FILE" ]; then
  echo "⚠️  Nouveaux fichiers de données détectés depuis le dernier rapport PMO Cockpit."
  echo "   Fichier le plus récent : $LATEST_FILE"
  echo "   Lance '/pmo-cockpit' pour générer un rapport de pilotage à jour."
fi

touch "$STAMP_FILE"
exit 0
