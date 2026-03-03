(py310) cccimac@cccimacdeiMac openclaw用法 % chmod +x stopOpenClaw.sh 
(py310) cccimac@cccimacdeiMac openclaw用法 % ./stopOpenClaw.sh 
(py310) cccimac@cccimacdeiMac openclaw用法 % ./stopOpenClaw.sh
(py310) cccimac@cccimacdeiMac openclaw用法 % launchctl list | grep -i openclaw || echo "No openclaw launch agents  
 running."
No openclaw launch agents          
 running.
(py310) cccimac@cccimacdeiMac openclaw用法 % openclaw gateway status

🦞 OpenClaw 2026.2.22-2 (45febec) — I'll butter your workflow like a lobster roll: messy, delicious, effective.

│
gateway connect failed: Error: unauthorized: gateway token mismatch (set gateway.remote.token to match gateway.auth.token)
◇  
Service: LaunchAgent (not loaded)
File logs: /var/folders/c1/yg5q2n011t1315g8hjtfvmr40000gn/T/openclaw-501/openclaw-2026-02-28.log
Command: /opt/homebrew/Cellar/node/25.6.1_1/bin/node /usr/local/lib/node_modules/openclaw/dist/index.js gateway --port 18789
Service file: ~/Library/LaunchAgents/ai.openclaw.gateway.plist
Service env: OPENCLAW_GATEWAY_PORT=18789

Config (cli): ~/.openclaw/openclaw.json
Config (service): ~/.openclaw/openclaw.json

Gateway: bind=loopback (127.0.0.1), port=18789 (service args)
Probe target: ws://127.0.0.1:18789
Dashboard: http://127.0.0.1:18789/
Probe note: Loopback-only gateway; only local clients can connect.

Runtime: unknown (Bad request.
Could not find service "ai.openclaw.gateway" in domain for user gui: 501)
RPC probe: failed
RPC target: ws://127.0.0.1:18789
  gateway closed (1008): unauthorized: gateway token mismatch (set gateway.remote.token to match gateway.auth.token)
  Gateway target: ws://127.0.0.1:18789
  Source: cli --url
  Config: /Users/cccimac/.openclaw/openclaw.json

Service unit not found.
Service not installed. Run: openclaw gateway install
File logs: /var/folders/c1/yg5q2n011t1315g8hjtfvmr40000gn/T/openclaw-501/openclaw-2026-02-28.log
Port 18789 is already in use.
- Port is in use but process details are unavailable (install lsof or run as an admin user).
Troubles: run openclaw status
Troubleshooting: https://docs.openclaw.ai/troubleshooting