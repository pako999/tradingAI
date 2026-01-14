'use client';
import { useEffect, useState } from 'react';
import { getNews, NewsItem } from '@/lib/api';
import { ExternalLink, Newspaper } from 'lucide-react';

export default function NewsFeed() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const data = await getNews();
                setNews(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    if (loading) return <div className="text-center text-neutral-500 text-xs animate-pulse mt-12">Scanning Global Media...</div>;
    if (news.length === 0) return null;

    return (
        <div className="w-full">
            <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <h3 className="text-sm font-bold text-neutral-400 tracking-[0.2em] uppercase flex items-center gap-2">
                    <Newspaper className="w-4 h-4" /> Global Crypto Wire
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {news.map((item) => (
                    <a
                        key={item.url}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group glass-panel border-white/5 p-3 hover:border-amber-500/30 transition-all flex flex-col gap-3 h-full"
                    >
                        <div className="w-full h-32 bg-neutral-900 rounded-lg overflow-hidden relative">
                            {item.image_url ? (
                                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
                                    <Newspaper className="w-8 h-8 text-neutral-700" />
                                </div>
                            )}
                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-2 py-0.5 rounded text-[10px] text-white">
                                {new Date(item.published_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>

                        <div className="flex flex-col flex-1 justify-between">
                            <h4 className="text-sm font-bold text-neutral-200 leading-snug group-hover:text-amber-400 transition-colors line-clamp-2">
                                {item.title}
                            </h4>
                            <div className="flex items-center gap-1 text-[10px] text-neutral-500 mt-2">
                                <span>Read Article</span>
                                <ExternalLink className="w-3 h-3" />
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
