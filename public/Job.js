var Job = (function () {
  function Job() {
    // Core display fields (mapped from YC API)
    this.title          = '';
    this.company        = '';
    this.location       = '';
    this.salary         = null;
    this.equity         = null;
    this.employmentType = null;   // job_type
    this.workplaceType  = null;   // derived from location
    this.role           = null;
    this.experience     = null;
    this.visa           = null;
    this.skills         = null;   // comma-separated string
    this.description    = null;
    this.what_you_do    = null;
    this.what_you_get   = null;
    this.founders       = [];
    this.company_slug   = null;
    // Apply link
    this.href           = null;   // YC job URL
    // Legacy / unused
    this.jobId          = null;
    this.easyApply      = false;
    this.logoUrl        = null;
    this.filtersTest    = null;
    this.scraped_at     = null;
  }
  Object.defineProperty(Job.prototype, 'applyHref', {
    get: function () {
      return this.href || '#';
    },
    enumerable: false,
    configurable: true,
  });
  return Job;
}());

/** Map a raw YC API job object to a Job instance */
function mapYCJob(raw) {
  var j = new Job();
  j.title          = raw.title         || '';
  j.company        = raw.company_name  || '';
  j.location       = raw.location      || '';
  j.salary         = raw.salary        || null;
  j.equity         = raw.equity        || null;
  j.employmentType = raw.job_type      || null;
  j.workplaceType  = (raw.location || '').toLowerCase().includes('remote') ? 'Remote' : null;
  j.role           = raw.role          || null;
  j.experience     = raw.experience    || null;
  j.visa           = raw.visa          || null;
  j.skills         = raw.skills        || null;
  j.description    = [raw.description, raw.what_you_do, raw.what_you_get]
                       .filter(Boolean).join('\n\n') || null;
  j.founders       = raw.founders      || [];
  j.company_slug   = raw.company_slug  || null;
  j.scraped_at     = raw.scraped_at    || null;
  j.href           = raw.url           || null;
  j.easyApply      = false;
  j.logoUrl        = null;
  return j;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Job, mapYCJob };
}
