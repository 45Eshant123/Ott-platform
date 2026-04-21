import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LegalPage = () => {
    return (
        <>
            <Helmet>
                <title>Legal Information - StreamVault</title>
                <meta name="description" content="Legal information, copyright notices, and intellectual property details for StreamVault" />
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
                                <Scale className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h1 className="font-display font-bold text-4xl md:text-5xl text-card-foreground" style={{ letterSpacing: '-0.02em' }}>
                                    Legal Information
                                </h1>
                                <p className="text-muted-foreground mt-2">Last updated: April 17, 2026</p>
                            </div>
                        </div>

                        <div className="space-y-8 text-card-foreground">
                            <section>
                                <h2 className="font-display font-semibold text-2xl mb-4">Copyright Notice</h2>
                                <div className="space-y-4 text-card-foreground/80 leading-relaxed">
                                    <p>
                                        All content available on StreamVault, including but not limited to text, graphics, logos, images, audio clips, video clips, digital downloads, and software, is the property of StreamVault or its content suppliers and is protected by international copyright laws.
                                    </p>
                                    <p>
                                        The compilation of all content on this platform is the exclusive property of StreamVault and is protected by international copyright laws. All software used on this platform is the property of StreamVault or its software suppliers and is protected by international copyright laws.
                                    </p>
                                    <p>
                                        © 2026 StreamVault. All rights reserved. Unauthorized reproduction, distribution, or transmission of any content is strictly prohibited.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="font-display font-semibold text-2xl mb-4">Intellectual Property Rights</h2>
                                <div className="space-y-4 text-card-foreground/80 leading-relaxed">
                                    <p>
                                        StreamVault and its licensors own all intellectual property rights in the platform and its content. These rights include but are not limited to:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Trademarks, service marks, and trade names</li>
                                        <li>Patents and patent applications</li>
                                        <li>Copyrights in original works of authorship</li>
                                        <li>Trade secrets and proprietary information</li>
                                        <li>Database rights and compilation rights</li>
                                    </ul>
                                    <p>
                                        You may not use any of StreamVault's intellectual property without our prior written consent. Any unauthorized use may violate copyright, trademark, and other applicable laws.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="font-display font-semibold text-2xl mb-4">Content Licensing</h2>
                                <div className="space-y-4 text-card-foreground/80 leading-relaxed">
                                    <p>
                                        All video content, including movies, series, and anime available on StreamVault, is licensed from content providers and distributors. StreamVault holds the necessary rights to stream this content to subscribers within authorized territories.
                                    </p>
                                    <p>
                                        Content availability may vary by region due to licensing restrictions. StreamVault reserves the right to add or remove content from the platform at any time without prior notice.
                                    </p>
                                    <p>
                                        Users are granted a limited, non-exclusive, non-transferable license to access and view content solely for personal, non-commercial use through the StreamVault platform.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="font-display font-semibold text-2xl mb-4">Digital Millennium Copyright Act (DMCA)</h2>
                                <div className="space-y-4 text-card-foreground/80 leading-relaxed">
                                    <p>
                                        StreamVault respects the intellectual property rights of others and expects users to do the same. If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement, please provide our copyright agent with the following information:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>A physical or electronic signature of the copyright owner or authorized representative</li>
                                        <li>Identification of the copyrighted work claimed to have been infringed</li>
                                        <li>Identification of the material that is claimed to be infringing</li>
                                        <li>Your contact information (address, telephone number, email)</li>
                                        <li>A statement of good faith belief that the use is not authorized</li>
                                        <li>A statement of accuracy under penalty of perjury</li>
                                    </ul>
                                    <p className="font-medium">
                                        Copyright Agent Contact: legal@streamvault.com
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="font-display font-semibold text-2xl mb-4">Liability Disclaimers</h2>
                                <div className="space-y-4 text-card-foreground/80 leading-relaxed">
                                    <p className="font-medium">
                                        SERVICE PROVIDED "AS IS"
                                    </p>
                                    <p>
                                        StreamVault provides its services on an "as is" and "as available" basis. We make no warranties, expressed or implied, regarding the operation of our service or the content available through it.
                                    </p>
                                    <p className="font-medium">
                                        LIMITATION OF LIABILITY
                                    </p>
                                    <p>
                                        To the fullest extent permitted by law, StreamVault shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Your access to or use of or inability to access or use the service</li>
                                        <li>Any conduct or content of any third party on the service</li>
                                        <li>Any content obtained from the service</li>
                                        <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                                    </ul>
                                    <p className="font-medium">
                                        INDEMNIFICATION
                                    </p>
                                    <p>
                                        You agree to indemnify and hold harmless StreamVault and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising out of your use of the service or violation of these terms.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="font-display font-semibold text-2xl mb-4">Governing Law</h2>
                                <div className="space-y-4 text-card-foreground/80 leading-relaxed">
                                    <p>
                                        These legal terms shall be governed by and construed in accordance with the laws of the jurisdiction in which StreamVault operates, without regard to its conflict of law provisions.
                                    </p>
                                    <p>
                                        Any disputes arising from these terms or your use of the service shall be resolved through binding arbitration in accordance with the rules of the applicable arbitration association.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="font-display font-semibold text-2xl mb-4">Contact Information</h2>
                                <div className="space-y-4 text-card-foreground/80 leading-relaxed">
                                    <p>
                                        For legal inquiries, copyright concerns, or other legal matters, please contact:
                                    </p>
                                    <div className="bg-muted rounded-lg p-4 mt-4">
                                        <p className="font-medium">StreamVault Legal Department</p>
                                        <p>Email: legal@streamvault.com</p>
                                        <p>Response time: 5-7 business days</p>
                                    </div>
                                </div>ī
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LegalPage;