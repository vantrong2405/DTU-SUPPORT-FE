<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="bg-background text-foreground min-h-screen py-16 sm:py-24">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center">
          Terms of Service
        </h1>

        <div class="prose prose-sm sm:prose max-w-none dark:prose-invert space-y-4">
          <p class="text-muted-foreground">
            Last updated: {{ new Date().toLocaleDateString() }}
          </p>

          <section>
            <h2 class="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using DTU Support service, you agree to be bound by these Terms of Service.
              If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-3">2. Responsible Use</h2>
            <p>
              By using DTU Support, you agree to use the service responsibly. You agree not to:
            </p>
            <ul class="list-disc pl-6 space-y-1">
              <li>Attempt to gain unauthorized access to our systems or networks</li>
              <li>Use the service for any illegal purpose or to violate any laws</li>
              <li>Interfere with or disrupt the service or servers</li>
              <li>Transmit any viruses or malicious code</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-3">3. Service Modifications</h2>
            <p>
              We reserve the right to modify, suspend, or discontinue the service at any time
              with or without prior notice. We shall not be liable to you or any third-party
              for any modification, suspension, or discontinuation of the service.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-3">4. Limitation of Liability</h2>
            <p>
              The service is provided "as is" without warranty of any kind. We shall not be liable
              for any indirect, incidental, special, consequential or punitive damages resulting
              from your use or inability to use the service.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-3">5. Changes to Terms</h2>
            <p>
              We may update these Terms of Service from time to time. You are advised to review
              this page regularly for any changes. Your continued use of the service following
              the posting of changes constitutes acceptance of those changes.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-3">6. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us:
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
