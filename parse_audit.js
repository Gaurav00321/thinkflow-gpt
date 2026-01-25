const fs = require('fs');
try {
    const report = JSON.parse(fs.readFileSync('audit_final.json', 'utf8'));
    const vulnerabilities = report.vulnerabilities || {};
    let critical = 0, high = 0, moderate = 0, low = 0;

    for (const key in vulnerabilities) {
        const v = vulnerabilities[key];
        if (v.severity === 'critical') critical++;
        else if (v.severity === 'high') high++;
        else if (v.severity === 'moderate') moderate++;
        else if (v.severity === 'low') low++;
    }

    console.log(`Summary: Critical=${critical}, High=${high}, Moderate=${moderate}, Low=${low}`);

    console.log('\nDetails (Critical & High):');
    for (const key in vulnerabilities) {
        const v = vulnerabilities[key];
        if (v.severity === 'critical' || v.severity === 'high') {
            console.log(`- ${key} (${v.severity})`);
            // console.log(`  via: ${JSON.stringify(v.via)}`); 
            // simple output
        }
    }
} catch (e) {
    console.error(e);
}
