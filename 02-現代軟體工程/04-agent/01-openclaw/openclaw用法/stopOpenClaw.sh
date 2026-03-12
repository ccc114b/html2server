   for f in ~/Library/LaunchAgents/*openclaw*.plist; do                          
   [ -e "$f" ] || continue                                                       
   launchctl bootout "gui/$(id -u)" "$f" 2>/dev/null || true                     
   launchctl disable "gui/$(id -u)/$(basename "$f" .plist)" 2>/dev/null || true  
   done        