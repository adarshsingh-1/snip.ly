import { useState, useEffect, useMemo } from 'react';
import api from '../services/api';

export default function LinkItem({ link, onDelete }) {
  const [copied, setCopied] = useState(false);
  const [prevClicks, setPrevClicks] = useState(link.clicks);
  const [pulse, setPulse] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [preview, setPreview] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  const shortDomain = import.meta.env.VITE_SHORT_DOMAIN || 'http://localhost:3000';
  const shortUrl = `${shortDomain}/${link.shortId}`;

  const getPreviewMeta = () => {
    try {
      const url = new URL(link.originalUrl);
      const hostname = url.hostname.replace(/^www\./, '');
      const path = `${url.pathname}${url.search}`.replace(/\/$/, '');
      return {
        hostname,
        path: path && path !== '/' ? path : '',
      };
    } catch (error) {
      return { hostname: 'link', path: '' };
    }
  };

  const { hostname } = getPreviewMeta();
  const thumbnailUrl = `https://image.thum.io/get/width/640/crop/420/${encodeURIComponent(link.originalUrl)}`;
  const fallbackIcon = `https://www.google.com/s2/favicons?sz=128&domain_url=${encodeURIComponent(link.originalUrl)}`;

  useEffect(() => {
    let active = true;
    setPreview(null);
    setImageIndex(0);

    const fetchPreview = async () => {
      try {
        const { data } = await api.get('/links/preview', {
          params: { url: link.originalUrl }
        });
        if (!active) return;
        setPreview(data || null);
      } catch (error) {
        if (!active) return;
        setPreview(null);
      }
    };

    fetchPreview();
    return () => {
      active = false;
    };
  }, [link.originalUrl]);

  const imageCandidates = useMemo(() => {
    return [preview?.image, thumbnailUrl, fallbackIcon].filter(Boolean);
  }, [preview?.image, thumbnailUrl, fallbackIcon]);

  const imageSrc = imageCandidates[Math.min(imageIndex, imageCandidates.length - 1)];

  useEffect(() => {
    if (link.clicks > prevClicks) {
      setPulse(true);
      setTimeout(() => setPulse(false), 1000);
    }
    setPrevClicks(link.clicks);
  }, [link.clicks, prevClicks]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDelete(link._id);
    } catch (err) {
      console.error('Delete failed', err);
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm transition">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="w-28 h-20 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
            <img
              src={imageSrc}
              alt="Link preview"
              loading="lazy"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={() => setImageIndex((prev) => Math.min(prev + 1, imageCandidates.length - 1))}
            />
          </div>

          <div className="flex-1 min-w-0 text-left">
            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline font-medium block truncate text-lg"
            >
              {shortDomain.replace(/^https?:\/\//, '')}/{link.shortId}
            </a>
            <p className="text-sm text-slate-500 dark:text-slate-400 truncate mt-1">{link.originalUrl}</p>
            {preview?.title && (
              <p className="text-sm text-slate-900 dark:text-slate-100 mt-2 line-clamp-2">
                {preview.title}
              </p>
            )}
            {preview?.description && (
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
                {preview.description}
              </p>
            )}
            <div className="mt-2 text-xs text-slate-400 dark:text-slate-500 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {preview?.siteName || hostname}
              </span>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">Created {formatDate(link.createdAt)}</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              pulse
                ? 'bg-green-100 text-green-700 scale-110'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {link.clicks} {link.clicks === 1 ? 'click' : 'clicks'}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg transition font-medium"
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>

            {showConfirm ? (
              <div className="flex gap-2">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                >
                  {deleting ? 'Deleting...' : 'Confirm'}
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  disabled={deleting}
                  className="px-3 py-1 text-sm bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowConfirm(true)}
                className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-slate-800 rounded-lg transition"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}