'use client';

export default function ArvanIframe({
  configUrl,
  title = 'Arvan VOD',
}: { configUrl: string; title?: string }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', width: '100%', paddingTop: '56.25%' }}>
      <iframe
        src={`https://player.arvancloud.ir/index.html?config=${encodeURIComponent(configUrl)}`}
        title={title}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
        frameBorder={0}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
