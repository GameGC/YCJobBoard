"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapYCJob = mapYCJob;
class Job {
    // Core display fields
    title = '';
    company = '';
    location = '';
    salary = null;
    equity = null;
    employmentType = null;
    workplaceType = null;
    role = null;
    experience = null;
    visa = null;
    skills = null;
    description = null;
    what_you_do = null;
    what_you_get = null;
    founders = [];
    company_slug = null;
    // Apply link
    href = null;
    // Legacy / unused
    jobId = null;
    easyApply = false;
    logoUrl = null;
    filtersTest = null;
    scraped_at = null;
    get applyHref() {
        return this.href || '#';
    }
}
exports.default = Job;
/** Map a raw YC API job object to a Job instance */
function mapYCJob(raw) {
    const j = new Job();
    j.title = raw.title || '';
    j.company = raw.company_name || '';
    j.location = raw.location || '';
    j.salary = raw.salary || null;
    j.equity = raw.equity || null;
    j.employmentType = raw.job_type || null;
    j.workplaceType = (raw.location || '').toLowerCase().includes('remote') ? 'Remote' : null;
    j.role = raw.role || null;
    j.experience = raw.experience || null;
    j.visa = raw.visa || null;
    j.skills = raw.skills || null;
    j.description = [raw.description, raw.what_you_do, raw.what_you_get]
        .filter(Boolean).join('\n\n') || null;
    j.founders = raw.founders || [];
    j.company_slug = raw.company_slug || null;
    j.scraped_at = raw.scraped_at || null;
    j.href = raw.url || null;
    return j;
}
