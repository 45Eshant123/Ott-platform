import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TermsOfServicePage = () => {
    return (
        <>
            <Helmet>
                <title>Terms of Service - StreamVault</title>
                <meta name="description" content="StreamVault terms of service - user agreement, account responsibilities, and service usage guidelines" />
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
                                <FileText className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h1 className="font-display font-bold text-4xl md:text-5xl text-card-foreground" style={{ letterSpacing: '-0.02em' }}>
                                    Terms of Service
                                </h1>
                                <p className="text-muted-foreground mt-2">Last updated: April 17, 2026</p>
                            </div>
                        </div>

                        <div className="space-y-8 text-card-foreground">
                            <section>
                                <h2 className="font-display font-semibold text-2xl mb-4">User Agreement</h2>
                                <div className="space-y-4 text-card-foreground/80 leading-relaxed">
                                    <p>
                                        Welcome to StreamVault. By accessing or using our streaming platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this service.
                                    </p>
                                    <p>
                                        These Terms constitute a legally binding agreement between you and StreamVault. Your use of the service is also governed by our Privacy Policy, which is incorporated into these Terms by reference.
                                    </p>
                                    <p>
                                        We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of the service after changes are posted constitutes acceptance of the modified Terms.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="font-display font-semibold text-2xl mb-4">Account Responsibilities</h2>
                                <div className="space-y-4 text-card-foreground/80 leading-relaxed">
                                    <h3 className="font-semibold text-lg text-card-foreground">Account Creation</h3>
                                    <p>
                                        To use StreamVault, you must create an account. When creating an account, you agree to:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Provide accurate, current, and complete information</li>
                                        <li>Maintain and promptly update your account information</li>
                                        <li>Be at least 13 years of age or have parental consent</li>
                                        <li>Keep your password secure and confidential</li>
                                        <li>Accept responsibility for all activities under your account</li>
                                        <li>Notify us immediately of any unauthorized access</li>
                                    </ul>

                                    <h3 className="font-semibold text-lg text-card-foreground mt-6">Account Security</h3>
                                    <p>
                                        You are responsible for maintaining the confidentiality of your account credentials. You agree to:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Not share your account with others</li>
                                        <li>Use a strong, unique password</li>
                                        <li>Log out from shared or public devices</li>
                                        <li>Report any security breaches immediately</li>
                                    </ul>
                                    <p className="mt-4">
                                        StreamVault will not be liable for any loss or damage arising from your failure to protect your account information.
                                    </p>

                                    <h3 className="font-semibold text-lg text-card-foreground mt-6">Account Termination</h3>
                                    <p>
                                        You may terminate your account at any time through your profile settings. We reserve the right to suspend or terminate your account if you violate these Terms or engage in fraudulent or illegal activities.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="font-display font-semibold text-2xl mb-4">Content Usage Rights and Restrictions</h2>
                                <div className="space-y-4 text-card-foreground/80 leading-relaxed">
                                    <h3 className="font-semibold text-lg text-card-foreground">License Grant</h3>
                                    <p>
                                        Subject to your compliance with these Terms, StreamVault grants you a limited, non-exclusive, non-transferable, revocable license to:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Access and stream content for personal, non-commercial use</li>
                                        <li>View content on compatible devices</li>
                                        <li>Create watchlists and manage viewing preferences</li>
                                    </ul>

                                    <h3 className="font-semibold text-lg text-card-foreground mt-6">Usage Restrictions</h3>
                                    <p>
                                        You agree NOT to:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Download, copy, or redistribute any content</li>
                                        <li>Remove or modify copyright notices or watermarks</li>
                                        <li>Use content for commercial purposes</li>
                                        <li>Circumvent geographic or technological restrictions</li>
                                        <li>Use automated systems to access the service</li>
                                        <li>Reverse engineer or decompile any part of the platform</li>
                                        <li>Share your account credentials with others</li>
                                        <li>Create derivative works from our content</li>
                                    </ul>

                                    <h3 className="font-semibold text-lg text-card-foreground mt-6">Geographic Restrictions</h3>
                                    <p>
                                        Content availability varies by region due to licensing agreements. You may only access content available in your geographic location. Using VPNs or other methods to circumvent geographic restrictions is prohibited.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="font-display font-semibold text-2xl mb-4">Prohibited Activities</h2>
                                <div className="space-y-4 text-card-foreground/80 leading-relaxed">
                                    <p>
                                        When using StreamVault, you agree not to engage in any of the following prohibited activities:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Violating any applicable laws or regulations</li>
                                        <li>Infringing on intellectual property rights</li>
                                        <li>Transmitting viruses, malware, or harmful code</li>
                                        <li>Attempting to gain unauthorized access to our systems</li>
                                        <li>Interfering with or disrupting the service</li>
                                        <li>Impersonating others or providing false information</li>
                                        <li>Harassing, threatening, or abusing other users</li>
                                        <li>Collecting user information without consent</li>
                                        <li>Using the service for fraudulent purposes</li>
                                        <li>Reselling or redistributing access to the service</li>
                                        <li>Creating multiple accounts to abuse promotions</li>
                                        <li>Posting spam or unsolicited communications</li>
                                    </ul>
                                    <p className="mt-4">
                                        Violation of these prohibitions may result in immediate account termination and legal action.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="font-display font-semibold text-2xl mb-4">Service Limitations</h2>
                                <div className="space-y-4 text-card-foreground/80 leading-relaxed">
                                    <h3 className="font-semibold text-lg text-card-foreground">Service Availability</h3>
                                    <p>
                                        While we strive to provide uninterrupted service, StreamVault does not guarantee:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Continuous, uninterrupted, or error-free operation</li>
                                        <li>Availability of specific content at all times</li>
                                        <li>Compatibility with all devices or platforms</li>
                                        <li>Specific streaming quality or performance</li>
                                    </ul>

                                    <h3 className="font-semibold text-lg text-card-foreground mt-6">Maintenance and Updates</h3>
                                    <p>
                                        We reserve the right to:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Perform scheduled and emergency maintenance</li>
                                        <li>Modify or discontinue features without notice</li>
                                        <li>Update content libraries and availability</li>
                                        <li>Change subscription plans and pricing</li>
                                    </ul>

                                    <h3 className="font-semibold text-lg text-card-foreground mt-6">Technical Requirements</h3>
                                    <p>
                                        You are responsible for:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Maintaining compatible devices and software</li>
                                        <li>Ensuring adequate internet connectivity</li>
                                        <li>Meeting minimum system requirements</li>
                                        <li>Covering costs of internet access and data usage</li>
                                    </ul>
                                </div>
                            </section>

                            <section>
                                <h2 className="font-display font-semibold text-2xl mb-4">Subscription and Billing</h2>
                                <div className="space-y-4 text-card-foreground/80 leading-relaxed">
                                    <h3 className="font-semibold text-lg text-card-foreground">Payment Terms</h3>
                                    <p>
                                        By subscribing to StreamVault, you agree to:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Pay all applicable subscription fees</li>
                                        <li>Provide valid payment information</li>
                                        <li>Authorize automatic recurring billing</li>
                                        <li>Pay any applicable taxes</li>
                                    </ul>

                                    <h3 className="font-semibold text-lg text-card-foreground mt-6">Cancellation and Refunds</h3>
                                    <p>
                                        You may cancel your subscription at any time. Cancellations take effect at the end of the current billing period. We do not provide refunds for partial subscription periods except as required by law.
                                    </p>

                                    <h3 className="font-semibold text-lg text-card-foreground mt-6">Price Changes</h3>
                                    <p>
                                        We reserve the right to change subscription prices with 30 days notice. Continued use of the service after a price change constitutes acceptance of the new pricing.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="font-display font-semibold text-2xl mb-4">Termination Policy</h2>
                                <div className="space-y-4 text-card-foreground/80 leading-relaxed">
                                    <h3 className="font-semibold text-lg text-card-foreground">Termination by User</h3>
                                    <p>
                                        You may terminate your account at any time by:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Canceling your subscription through account settings</li>
                                        <li>Contacting customer support</li>
                                        <li>Following the cancellation process in your account</li>
                                    </ul>

                                    <h3 className="font-semibold text-lg text-card-foreground mt-6">Termination by StreamVault</h3>
                                    <p>
                                        We may suspend or terminate your account immediately if:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>You violate these Terms of Service</li>
                                        <li>You engage in fraudulent or illegal activities</li>
                                        <li>Your payment method fails or is declined</li>
                                        <li>We are required to do so by law</li>
                                        <li>We discontinue the service</li>
                                    </ul>

                                    <h3 className="font-semibold text-lg text-card-foreground mt-6">Effect of Termination</h3>
                                    <p>
                                        Upon termination:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Your access to the service will cease immediately</li>
                                        <li>Your account data may be deleted</li>
                                        <li>You will lose access to watchlists and viewing history</li>
                                        <li>Outstanding fees remain due and payable</li>
                                    </ul>
                                </div>
                            </section>

                            <section>
                                <h2 className="font-display font-semibold text-2xl mb-4">Disclaimer of Warranties</h2>
                                <div className="space-y-4 text-card-foreground/80 leading-relaxed">
                                    <p className="font-medium uppercase">
                                        The service is provided "as is" and "as available" without warranties of any kind, either express or implied.
                                    </p>
                                    <p>
                                        StreamVault disclaims all warranties, including but not limited to:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Merchantability and fitness for a particular purpose</li>
                                        <li>Non-infringement of third-party rights</li>
                                        <li>Accuracy, reliability, or completeness of content</li>
                                        <li>Uninterrupted or error-free service</li>
                                        <li>Security of data transmission</li>
                                    </ul>
                                </div>
                            </section>

                            <section>
                                <h2 className="font-display font-semibold text-2xl mb-4">Changes to Terms</h2>
                                <div className="space-y-4 text-card-foreground/80 leading-relaxed">
                                    <p>
                                        We reserve the right to modify these Terms at any time. Material changes will be communicated through:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Email notification to your registered address</li>
                                        <li>Prominent notice on the platform</li>
                                        <li>In-app notifications</li>
                                    </ul>
                                    <p className="mt-4">
                                        Your continued use of StreamVault after changes are posted constitutes acceptance of the modified Terms. If you do not agree to the changes, you must stop using the service and cancel your account.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="font-display font-semibold text-2xl mb-4">Dispute Resolution</h2>
                                <div className="space-y-4 text-card-foreground/80 leading-relaxed">
                                    <p>
                                        Any disputes arising from these Terms or your use of the service shall be resolved through binding arbitration in accordance with applicable arbitration rules. You waive your right to participate in class action lawsuits or class-wide arbitration.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="font-display font-semibold text-2xl mb-4">Contact Information</h2>
                                <div className="space-y-4 text-card-foreground/80 leading-relaxed">
                                    <p>
                                        For questions about these Terms of Service or to report violations, please contact:
                                    </p>
                                    <div className="bg-muted rounded-lg p-4 mt-4">
                                        <p className="font-medium">StreamVault Support Team</p>
                                        <p>Email: support@streamvault.com</p>
                                        <p>Legal inquiries: legal@streamvault.com</p>
                                        <p>Response time: 2-3 business days</p>
                                    </div>
                                </div>
                            </section>

                            <section className="border-t border-border pt-8">
                                <p className="text-sm text-muted-foreground">
                                    By using StreamVault, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TermsOfServicePage;