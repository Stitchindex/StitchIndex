+++
title = "Submit a resource"
url = "/submit/"
description = "Know a free sewing pattern or guide that should be listed? Submit it here."
+++

<div class="submit-page">
  <h1>Submit a resource</h1>
  <p>Found a free pattern, guide, or tutorial that belongs in the directory? Fill in the details below and I'll review it and add it if it's a good fit. Please only submit resources that are freely available — no paywalls or sign-up requirements.</p>

  <!-- Netlify Forms handles this with zero backend needed -->
  <div class="form-card">
    <form name="submit-resource" method="POST" data-netlify="true" netlify-honeypot="bot-field">
      <input type="hidden" name="form-name" value="submit-resource" />
      <p style="display:none;"><label>Don't fill this out: <input name="bot-field" /></label></p>

      <div class="form-group">
        <label for="url">URL of the resource *</label>
        <input type="url" id="url" name="url" placeholder="https://…" required />
        <p class="form-note">If the original link is dead, paste an archive.org Wayback Machine link instead.</p>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="category">Category *</label>
          <select id="category" name="category" required>
            <option value="">Select…</option>
            <option value="apparel">Apparel</option>
            <option value="home-goods">Home goods</option>
            <option value="outdoor-myog">Outdoor & MYOG</option>
            <option value="kids-baby">Kids & baby</option>
            <option value="quilting-crafts">Quilting & crafts</option>
            <option value="materials-tools">Materials & tools</option>
          </select>
        </div>
        <div class="form-group">
          <label for="type">Resource type *</label>
          <select id="type" name="type" required>
            <option value="">Select…</option>
            <option value="free-pattern">Free pattern</option>
            <option value="guide">Guide / tutorial</option>
            <option value="video">Video</option>
            <option value="archive">Archived resource</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="difficulty">Difficulty level</label>
          <select id="difficulty" name="difficulty">
            <option value="">Not sure</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div class="form-group">
          <label for="source">Source website</label>
          <input type="text" id="source" name="source" placeholder="e.g. sewguide.com" />
        </div>
      </div>

      <div class="form-group">
        <label for="notes">Why should it be listed? (optional)</label>
        <textarea id="notes" name="notes" placeholder="What makes this resource useful or unique?"></textarea>
      </div>

      <button type="submit" class="form-submit">Submit for review</button>
    </form>
  </div>
</div>
