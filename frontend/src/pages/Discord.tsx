import { useState, useEffect } from 'react';
import {
  Lock,
  Wifi,
  WifiOff,
  Server,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { api, DiscordStatus, DiscordGuild } from '../services/api';

export default function Discord() {
  const [token, setToken] = useState('');
  const [botStatus, setBotStatus] = useState<DiscordStatus>({
    connected: false,
    username: null,
    guilds: 0,
  });
  const [guilds, setGuilds] = useState<DiscordGuild[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    checkStatus();
  }, []);

  async function checkStatus() {
    try {
      const status = await api.discord.status();
      setBotStatus(status);
      if (status.connected) {
        const guildList = await api.discord.listGuilds();
        setGuilds(guildList);
      }
    } catch {
      // Bot not connected, that's fine
    }
  }

  async function handleConnect(e: React.FormEvent) {
    e.preventDefault();
    if (!token.trim()) return;

    setIsConnecting(true);
    setError(null);

    try {
      const result = await api.discord.connect(token);
      setBotStatus({ connected: true, username: null, guilds: result.guilds.length });
      setGuilds(result.guilds);
      setToken('');
      setSuccess('Bot connected!');
      setTimeout(() => setSuccess(null), 3000);
      const status = await api.discord.status();
      setBotStatus(status);
    } catch (err: any) {
      setError(err.message || 'Failed to connect. Check your token.');
    } finally {
      setIsConnecting(false);
    }
  }

  async function handleDisconnect() {
    try {
      await api.discord.disconnect();
      setBotStatus({ connected: false, username: null, guilds: 0 });
      setGuilds([]);
      setSuccess('Bot disconnected.');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to disconnect');
    }
  }

  async function handleReconnect() {
    setIsConnecting(true);
    setError(null);
    try {
      const result = await api.discord.reconnect();
      if (result.status === 'no_token') {
        setError('No saved token found. Enter a bot token to connect.');
      } else {
        setBotStatus({ connected: true, username: null, guilds: result.guilds?.length || 0 });
        if (result.guilds) setGuilds(result.guilds);
        const status = await api.discord.status();
        setBotStatus(status);
        setSuccess('Reconnected!');
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to reconnect');
    } finally {
      setIsConnecting(false);
    }
  }

  return (
    <div className="p-4 sm:p-8 max-w-3xl">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-4xl font-bold text-ash-text mb-2">Discord</h1>
        <p className="text-ash-muted text-sm sm:text-base">Connect your Discord bot so Darius can talk in your server</p>
      </div>

      {/* Error / Success */}
      {error && (
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-red-300 mb-6">
          {error}
          <button onClick={() => setError(null)} className="float-right text-red-400 hover:text-red-200">×</button>
        </div>
      )}
      {success && (
        <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 text-green-300 mb-6">
          {success}
        </div>
      )}

      {/* Bot Status + Connection */}
      <div className="bg-ash-card border border-ash-border rounded-lg p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h2 className="text-lg font-semibold text-ash-text">Bot Status</h2>
          <div className="flex items-center gap-3 flex-wrap">
            {botStatus.connected ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-green-400">
                    {botStatus.username || 'Connected'} — {botStatus.guilds} server{botStatus.guilds !== 1 ? 's' : ''}
                  </span>
                </div>
                <button
                  onClick={handleDisconnect}
                  className="px-3 py-1 text-sm bg-red-900/30 text-red-400 rounded hover:bg-red-900/50 transition-colors"
                >
                  Disconnect
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2 flex-wrap">
                <WifiOff className="w-4 h-4 text-ash-muted" />
                <span className="text-sm text-ash-muted">Disconnected</span>
                <button
                  onClick={handleReconnect}
                  disabled={isConnecting}
                  className="px-3 py-1 text-sm bg-ash-accent/20 text-ash-accent rounded hover:bg-ash-accent/30 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-3 h-3 inline mr-1 ${isConnecting ? 'animate-spin' : ''}`} />
                  Reconnect
                </button>
              </div>
            )}
          </div>
        </div>

        {!botStatus.connected && (
          <form onSubmit={handleConnect} className="flex flex-col sm:flex-row gap-3 mt-4">
            <div className="flex-1 relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ash-muted" />
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Paste your Discord bot token"
                className="w-full pl-10 pr-4 py-3 bg-ash-surface border border-ash-border rounded text-ash-text placeholder-ash-muted focus:outline-none focus:border-ash-accent"
                disabled={isConnecting}
              />
            </div>
            <button
              type="submit"
              disabled={!token.trim() || isConnecting}
              className="px-6 py-3 bg-ash-accent hover:bg-opacity-90 text-white rounded font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isConnecting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Wifi className="w-4 h-4" />
              )}
              Connect
            </button>
          </form>
        )}
      </div>

      {/* Connected Servers List */}
      {botStatus.connected && guilds.length > 0 && (
        <div className="bg-ash-card border border-ash-border rounded-lg p-4 sm:p-6 mb-6">
          <h3 className="text-sm font-semibold text-ash-muted uppercase tracking-wider flex items-center gap-2 mb-4">
            <Server className="w-4 h-4" />
            Connected Servers
          </h3>
          <div className="space-y-2">
            {guilds.map((guild) => (
              <div key={guild.id} className="flex items-center justify-between px-4 py-3 bg-ash-surface rounded border border-ash-border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-ash-accent/20 flex items-center justify-center text-xs font-bold text-ash-accent">
                    {guild.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-ash-text">{guild.name}</span>
                </div>
                <span className="text-xs text-ash-muted">{guild.memberCount} members</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Card */}
      <div className="bg-ash-card border border-ash-border rounded-lg p-4 sm:p-6">
        <h3 className="font-semibold text-ash-text mb-3">
          {botStatus.connected ? 'How it works' : 'How to get a bot token'}
        </h3>
        {botStatus.connected ? (
          <p className="text-sm text-ash-muted leading-relaxed">
            Your bot is connected. Darius can now send and read messages in your Discord server through Claude's MCP tools.
            All messaging happens through Darius in chat — this page is just for managing the connection.
          </p>
        ) : (
          <p className="text-sm text-ash-muted leading-relaxed">
            Go to the Discord Developer Portal, create a new application, add a bot under the "Bot" section,
            and copy the token. Then invite the bot to your server using the OAuth2 URL Generator with
            the "bot" scope and "Send Messages", "Read Message History", and "Add Reactions" permissions.
            Paste the token above and hit Connect.
          </p>
        )}
      </div>
    </div>
  );
}
