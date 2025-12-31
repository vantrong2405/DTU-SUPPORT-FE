<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="bg-background text-foreground min-h-screen py-16 sm:py-24">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center">
          Privacy Policy
        </h1>

        <div class="prose prose-sm sm:prose max-w-none dark:prose-invert space-y-4">
          <p class="text-muted-foreground">
            Last updated: {{ new Date().toLocaleDateString() }}
          </p>

          <section>
            <h2 class="text-xl font-semibold mb-3">1. Information We Collect</h2>
            <p>
              DTU Support uses Google OAuth for authentication. We only collect basic profile
              information including:
            </p>
            <ul class="list-disc pl-6 space-y-1">
              <li>Email address</li>
              <li>Public profile name</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
            <p>
              We do not store, share, or sell user data to third parties. All data is used solely for:
            </p>
            <ul class="list-disc pl-6 space-y-1">
              <li>Authentication purposes</li>
              <li>Authorization and access control</li>
              <li>Providing and maintaining the service</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-3">3. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-3">4. Third-Party Services</h2>
            <p>
              Our service uses Google OAuth for authentication. Google's privacy policy applies
              to the information collected by Google. You can review Google's privacy policy at:
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener" class="text-primary hover:underline">
                https://policies.google.com/privacy
              </a>
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-3">5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div class="bg-muted rounded-lg p-4 mt-3">
              <p class="font-medium">Email: trongdn2405@gmail.com</p>
            </div>
          </section>
        </div>

        <div class="mt-8 sm:mt-12 text-center">
          <NuxtLink
            to="/"
            class="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m19 12-7 7-7"></path>
              <path d="m12 19-7-7-7"></path>
            </svg>
            Back to Home
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
