import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-secondary text-secondary-foreground mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <Film className="w-8 h-8 text-primary" />
                            <span className="font-display font-bold text-xl">StreamVault</span>
                        </div>
                        <p className="text-sm text-secondary-foreground/80 max-w-md">
                            Your premium destination for movies, series, and anime. Stream unlimited content in high quality.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <div className="flex flex-col gap-2">
                            <Link to="/categories" className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
                                Categories
                            </Link>
                            <Link to="/search" className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
                                Search
                            </Link>
                            <Link to="/watchlist" className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
                                Watchlist
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Legal</h3>
                        <div className="flex flex-col gap-2">
                            <Link to="/legal" className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
                                Legal
                            </Link>
                            <Link to="/privacy" className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
                                Privacy Policy
                            </Link>
                            <Link to="/terms" className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-secondary-foreground/60">
                        © 2026 StreamVault. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="text-secondary-foreground/60 hover:text-primary transition-colors">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-secondary-foreground/60 hover:text-primary transition-colors">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-secondary-foreground/60 hover:text-primary transition-colors">
                            <Github className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;