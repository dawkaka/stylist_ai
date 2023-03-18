export default function Page() {
    return (

        <main className="bg-gray-50">
            <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Privacy Policy</h1>
                <div className="prose">
                    <p>At Virtual Wardrobe, we take your privacy seriously. This Privacy Policy explains how we collect, use, and share the personal information we collect from users of our [Name of Application] application.</p>

                    <h2 className="mt-8">Personal Information We Collect</h2>
                    <p>We collect the following personal information from our users:</p>
                    <ul className="list-disc pl-6">
                        <li>Name</li>
                        <li>Email address</li>
                    </ul>

                    <h2 className="mt-8">How We Use Your Personal Information</h2>
                    <p>
                        Your use your name to help people identify you and your email as a unique identify for signin purposes.
                        We may also use your email to send you notifications daily when it&apos;s time for your to answer your daily questions so you don&apos;t forget, you can unsubscribe any time.
                    </p>

                    <h2 className="mt-8">Sharing Your Personal Information</h2>
                    <p>We do not share your personal information with any third parties.</p>

                    <h2 className="mt-8">Data Retention</h2>
                    <p>
                        We would only have your personal data as long as you have a Virtual Wardrobe account, if you delete your account, all your data is also deleted.
                    </p>

                    <h2 className="mt-8">Security</h2>
                    <p>
                        We take appropriate measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
                        However, please be aware that no security measures can guarantee absolute protection.
                        Since we are using google for our auth services you wont&apos; have to worry about your password getting leaked from us.
                    </p>

                    <h2 className="mt-8">Changes to This Privacy Policy</h2>
                    <p>We reserve the right to update or modify this Privacy Policy at any time. Please check this page periodically to ensure that you are aware of any changes.</p>

                    <h2 className="mt-8">Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy or our data practices, please contact us at <a href="mailto:yousiph77@gmail.com">yousiph77@gmail.com</a>.</p>
                </div>
            </div>
        </main>

    )
}