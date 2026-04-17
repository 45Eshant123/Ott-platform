import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PrivacyPolicyPage = () => {
    return (
        <>
            <Helmet>
                <title>Privacy Policy - StreamVault</title>
                <meta name="description" content="StreamVault privacy policy - how we collect, use, and protect your personal information" />
            </Helmet>

            <div className="min-h-screen bg-background">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <Link to="/">
                        <Button variant="ghost" className="mb-8 gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Home
                        </Button>
                    </Link>

                    <div className="bg-card rounded-2xl p-8 md:p-12 shadow-lg">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <Shield className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h1 className="font-display font-bold text-4xl md:text-5xl text-card-foreground" style={{ letterSpacing: '-0.02em' }}>
                                    Privacy Policy
                                </h1>
                                <p className="text-muted-foreground mt-2">Last updated: April 17, 2026</p>
                            </div>
                        </div>

                        <div className="space-y-8 text-card-foreground">
                            <section>
                                <h2 className="font-display font-semibold text-2xl mb-4">Introduction</h2>
                                <div className="space-y-4 text-card-foreground/80 leading-relaxed">
                                    <p>
                                        At StreamVault, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our streaming platform. Please read this policy carefully to understand our practices regarding your personal data.
                                    </p>
                                    <p>
                                        By using StreamVault, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our service.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="font-display font-semibold text-2xl mb-4">Information We Collect</h2>
                                <div className="space-y-4 text-card-foreground/80 leading-relaxed">
                                    <h3 className="font-semibold text-lg text-card-foreground">Personal Information</h3>
                                    <p>
                                        We collect information that you provide directly to us, including:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Name and email address when you create an account</li>
                                        <li>Payment information when you subscribe to our service</li>
                                        <li>Profile information including avatar and language preferences</li>
                                        <li>Communications you send to our support team</li>
                                        <li>Feedback and survey responses</li>
                                    </ul>

                                    <h3 className="font-semibold text-lg text-card-foreground mt-6">Usage Information</h3>
                                    <p>
                                        We automatically collect certain information about your device and how you interact with our service:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Viewing history and watch progress</li>
                                        <li>Search queries and browsing behavior</li>
                                        <li>Device information (type, operating system, browser)</li>
                                        <li>IP address and approximate location</li>
                                        <li>Playback quality and streaming performance data</li>
                                        <li>Watchlist and favorites</li>
                                    </ul>

                                    <h3 className="font-semibold text-lg text-card-foreground mt-6">Cookies and Tracking Technologies</h3>
                                    <p>
                                        We use cookies, web beacons, and similar technologies to collect information about your browsing activities and to personalize your experience. See our Cookie Policy section below for more details.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="font-display font-semibold text-2xl mb-4">How We Use Your Information</h2>
                                <div className="space-y-4 text-card-foreground/80 leading-relaxed">
                                    <p>
                                        We use the information we collect for various purposes, including:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Providing, maintaining, and improving our streaming service</li>
                                        <li>Processing your subscription and payments</li>
                                        <li>Personalizing content recommendations based on your viewing history</li>
                                        <li>Sending you service-related notifications and updates</li>
                                        <li>Responding to your comments, questions, and support requests</li>
                                        <li>Analyzing usage patterns to improve user experience</li>
                                        <li>Detecting and preventing fraud, abuse, and security incidents</li>
                                        <li>Complying with legal obligations and enforcing our terms</li>
                                        <li>Conducting research and analytics to enhance our service</li>
                                    </ul>
                                </div>
                            </section>

                            <section>
                                <h2 className="font-display font-semibold text-2xl mb-4">Data Storage and Security</h2>
                                <div className="space-y-4 text-card-foreground/80 leading-relaxed">
                                    <h3 className="font-semibold text-lg text-card-foreground">Storage</h3>
                                    <p>
                                        Your personal information is stored on secure servers located in data centers that comply with industry-standard security practices. We retain your information for as long as your account is active or as needed to provide you services.
                                    </p>

                                    <h3 className="font-semibold text-lg text-card-foreground mt-6">Security Measures</h3>
                                    <p>
                                        We implement appropriate technical and organizational measures to protect your personal information, including:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Encryption of data in transit and at rest</li>
                                        <li>Regular security assessments and penetration testing</li>
                                        <li>Access controls and authentication mechanisms</li>
                                        <li>Employee training on data protection practices</li>
                                        <li>Incident response and breach notification procedures</li>
                                    </ul>
                                    <p className="mt-4">
                                        However, no method of transmission over the internet or electronic storage is completely secure. While we strive to protect your personal information, we cannot guarantee its absolute security.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="font-display font-semibold text-2xl mb-4">Your Privacy Rights</h2>
                                <div className="space-y-4 text-card-foreground/80 leading-relaxed">
                                    <p>
                                        Depending on your location, you may have the following rights regarding your personal information:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li><span className="font-medium">Access:</span> Request a copy of the personal information we hold about you</li>
                                        <li><span className="font-medium">Correction:</span> Request correction of inaccurate or incomplete information</li>
                                        <li><span className="font-medium">Deletion:</span> Request deletion of your personal information</li>
                                        <li><span className="font-medium">Portability:</span> Request transfer of your data to another service</li>
                                        <li><span className="font-medium">Objection:</span> Object to processing of your personal information</li>
                                        <li><span className="font-medium">Restriction:</span> Request restriction of processing in certain circumstances</li>
                                        <li><span className="font-medium">Withdrawal:</span> Withdraw consent where processing is based on consent</li>
                                    </ul>
                                    <p className="mt-4">
                                        To exercise these rights, please contact us at privacy@streamvault.com. We will respond to your request within 30 days.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="font-display font-semibold text-2xl mb-4">Cookie Policy</h2>
                                <div className="space-y-4 text-card-foreground/80 leading-relaxed">
                                    <p>
                                        StreamVault uses cookies and similar tracking technologies to enhance your experience. We use the following types of cookies:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li><span className="font-medium">Essential Cookies:</span> Required for the platform to function properly</li>
                                        <li><span className="font-medium">Performance Cookies:</span> Help us understand how you use our service</li>
                                        <li><span className="font-medium">Functional Cookies:</span> Remember your preferences and settings</li>
                                        <li><span className="font-medium">Targeting Cookies:</span> Used to deliver relevant content and recommendations</li>
                                    </ul>
                                    <p className="mt-4">
                                        You can control cookies through your browser settings. However, disabling certain cookies may limit your ability to use some features of our service.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="font-display font-semibold text-2xl mb-4">Third-Party Services</h2>
                                <div className="space-y-4 text-card-foreground/80 leading-relaxed">
                                    <p>
                                        We may share your information with third-party service providers who perform services on our behalf, including:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Payment processors for subscription billing</li>
                                        <li>Cloud hosting providers for data storage</li>
                                        <li>Analytics providers to understand service usage</li>
                                        <li>Customer support platforms</li>
                                        <li>Content delivery networks for streaming</li>
                                    </ul>
                                    <p className="mt-4">
                                        These third parties are contractually obligated to protect your information and use it only for the purposes we specify. We do not sell your personal information to third parties.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="font-display font-semibold text-2xl mb-4">Children's Privacy</h2>
                                <div className="space-y-4 text-card-foreground/80 leading-relaxed">
                                    <p>
                                        StreamVault is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="font-display font-semibold text-2xl mb-4">International Data Transfers</h2>
                                <div className="space-y-4 text-card-foreground/80 leading-relaxed">
                                    <p>
                                        Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those in your country. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="font-display font-semibold text-2xl mb-4">Changes to This Policy</h2>
                                <div className="space-y-4 text-card-foreground/80 leading-relaxed">
                                    <p>
                                        We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of StreamVault after such changes constitutes acceptance of the updated policy.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="font-display font-semibold text-2xl mb-4">Contact Us</h2>
                                <div className="space-y-4 text-card-foreground/80 leading-relaxed">
                                    <p>
                                        If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
                                    </p>
                                    <div className="bg-muted rounded-lg p-4 mt-4">
                                        <p className="font-medium">StreamVault Privacy Team</p>
                                        <p>Email: privacy@streamvault.com</p>
                                        <p>Response time: 3-5 business days</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrivacyPolicyPage;