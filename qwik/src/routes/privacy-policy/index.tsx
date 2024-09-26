import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import Infobox from "../../components/infobox/infobox";

export default component$(() => {
  return (
    <>
      <div class="container container-center container-spacing-xl">
        <h3>Privacy Policy</h3>
        <br />
        <p>Please go through our privacy policy carefully!</p>
      </div>

      <div class="container">
        <Infobox>
          <div q:slot="title" class="icon icon-info">
            This Privacy Policy outlines how we collect, use, and protect your information when you use our App, particularly regarding food recipes and allergy indications.
          </div>
          {/* <>
            <p>
              The Company is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website kspcommunity.com, including any other media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the "Site"). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
            <p>
              We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last Updated" date of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates. You will be deemed to have been made aware of, will be subject to, and will be deemed to have accepted the changes in any revised Privacy Policy by your continued use of the Site after the date such revised Privacy Policy is posted.
            </p>
          </> */}
        </Infobox>

        <Infobox>
          <div q:slot="title" class="icon icon-data">
            Information We Collect
          </div>
          <>
            <ol>
              <li>
                Personal Information
                <ul>
                  We may collect personal information that you provide to us directly, such as your name, email address, and any other information you choose to provide when creating an account.
                </ul>
              </li>
              <li>
                Usage Data
                <ul>
                  We automatically collect information about how you use the App, including your IP address, device information, and usage patterns.
                </ul>
              </li>
              <li>
                Recipe and Allergy Preferences
                <ul>
                  You can provide us with information regarding your dietary preferences, allergies, and other relevant health information to enhance your experience and ensure safe recipe recommendations.
                </ul>
              </li>
            </ol>
          </>
        </Infobox>

        <Infobox>
          <div q:slot="title" class="icon icon-security">
            How We Use Your Information
          </div>
          <>
            <p>
              We use the information we collect for various purposes, including to:
            </p>
            <ul>
              <li>Provide and maintain our App and services.</li>
              <li>Personalize your experience by recommending recipes based on your preferences.</li>
              <li>Communicate with you, including sending you updates and promotional materials.</li>
              <li>Analyze usage patterns to improve our App and services.</li>
              <li>Ensure compliance with legal obligations.</li>
            </ul>

          </>
        </Infobox>
      </div>

      <div class="container container-flex">
        <Infobox>
          <div q:slot="title" class="icon icon-access">
            Sharing Your Information
          </div>
          <>
            <p>
              We do not sell or rent your personal information to third parties. We may share your information in the following circumstances:


            </p>

            <ul>
              <li><b>Service Providers:</b> We may employ third-party companies and individuals to facilitate our App such as hosting services, analytics providers, and customer support.</li>
              <li><b>Legal Requirements:</b> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
            </ul>

          </>
        </Infobox>

        <Infobox>
          <div q:slot="title" class="icon icon-questions">
            Security of Your Information
          </div>
          <>
            <p>
              We take the security of your personal information seriously. We implement reasonable security measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.
            </p>
          </>
        </Infobox>

        <Infobox>
          <div q:slot="title" class="icon icon-policy">
            Your Rights
          </div>
          <>
            <p>
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul>
              <li>The right to access your personal data.</li>
              <li>The right to rectify inaccurate personal data.</li>
              <li>The right to request the deletion of your personal data.</li>
              <li>The right to object to or restrict processing of your personal data.</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the contact information below.
            </p>
          </>
        </Infobox>

        <Infobox>
          <div q:slot="title" class="icon icon-policy">
            Changes to This Privacy Policy
          </div>
          <>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the effective date at the top. We encourage you to review this Privacy Policy periodically for any changes.
            </p>
          </>
        </Infobox>
        <Infobox>
          <div q:slot="title" class="icon icon-policy">
            Contact Us
          </div>
          <>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul>
              <li>Email: support@upayan.space</li>
              <li>Address: Fork Feed,
                VIT,
                Vellore, Tamil Nadu, 632014
                India,
                +1-234-567-890</li>
            </ul>
          </>
        </Infobox>
      </div>

    </>
  );
});

export const head: DocumentHead = {
  title: "Privacy Policy",
  meta: [
    {
      name: "description",
      content: "Welcome to our Privacy Policy page!"
    }
  ]
};
