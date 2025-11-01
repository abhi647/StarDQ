# StarDQ 2.0 - Product Documentation

**Version**: 2.0
**Last Updated**: November 2025
**Document Type**: Product Feature Guide

---

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Core Features](#core-features)
4. [User Roles & Permissions](#user-roles--permissions)
5. [Module Documentation](#module-documentation)
6. [Best Practices](#best-practices)
7. [FAQs](#faqs)
8. [Support](#support)

---

## 1. Introduction

### What is StarDQ 2.0?

StarDQ 2.0 is an enterprise-grade Data Quality Fabric platform that combines automated data profiling, AI-powered insights, and comprehensive quality management tools to ensure your organization's data remains accurate, complete, and trustworthy.

### Key Benefits

- **Reduce Data Quality Issues by 80%**: Proactive detection and automated remediation
- **Save 60% of Manual Effort**: AI-powered data cleaning and validation
- **Ensure Compliance**: Built-in PII detection and masking capabilities
- **Accelerate Decision-Making**: Real-time quality metrics and dashboards
- **Reduce Data-Related Incidents**: Continuous monitoring and alerting

### Who Should Use StarDQ?

- **Data Stewards**: Manage data quality rules and policies
- **Data Engineers**: Integrate quality checks into data pipelines
- **Business Analysts**: Access high-quality data for analysis
- **IT Administrators**: Manage system configuration and access control
- **Compliance Officers**: Ensure data privacy and regulatory compliance
- **Executives**: Monitor organizational data quality metrics

---

## 2. Getting Started

### First Time Login

1. Navigate to StarDQ application URL
2. Log in with your credentials
3. The system will redirect you to the Dashboard based on your role

### Dashboard Overview

The Dashboard is your central hub for monitoring data quality:

#### KPI Cards
- **Total Datasets**: Number of datasets under management
- **Average Quality Score**: Overall data quality across all datasets
- **Healthy Datasets**: Datasets meeting quality thresholds (>90%)
- **Critical Alerts**: Unacknowledged high-priority issues

#### Visualizations
- **Quality Trends**: 7-day quality score progression
- **Data Quality Gauges**: Completeness, Validity, and Uniqueness metrics
- **Issue Distribution**: Breakdown of data quality issues by type
- **Domain Health**: Quality scores by business domain
- **Recent Activity**: Timeline of recent quality-related events

---

## 3. Core Features

### 3.1 Data Quality Badges

StarDQ uses a three-tier badge system to classify dataset quality:

#### 🥇 Gold Badge (95%+ Quality Score)
- **Criteria**:
  - Completeness ≥ 98%
  - Validity ≥ 95%
  - Uniqueness ≥ 98%
  - No critical issues
  - Regular updates (< 7 days)
- **Use Cases**: Production analytics, executive reporting, compliance audits

#### 🥈 Silver Badge (75-94% Quality Score)
- **Criteria**:
  - Completeness ≥ 85%
  - Validity ≥ 75%
  - Uniqueness ≥ 85%
  - Minor issues only
  - Regular updates (< 14 days)
- **Use Cases**: Operational reporting, data exploration, model training

#### 🥉 Bronze Badge (<75% Quality Score)
- **Criteria**:
  - Quality score below 75%
  - Significant data quality issues
  - May have stale data
- **Recommended Actions**: Review and remediate issues, schedule cleaning operations

### 3.2 Quality Dimensions

StarDQ evaluates data across six key dimensions:

#### Completeness
Measures the percentage of non-null values across all required fields.

**Formula**: `(Total Non-Null Values / Total Expected Values) × 100`

**Example**: A customer table with 1,000 rows where 920 have email addresses = 92% completeness for email field

#### Validity
Measures conformance to business rules and data formats.

**Checks Include**:
- Format validation (email, phone, date)
- Range validation (age, amounts)
- Reference integrity
- Business rule compliance

#### Uniqueness
Measures the absence of duplicate records.

**Formula**: `(Unique Records / Total Records) × 100`

**Detection Methods**:
- Exact duplicates
- Fuzzy matching
- Key field analysis

#### Freshness
Measures how up-to-date the data is.

**Metrics**:
- Time since last update
- Update frequency
- Expected vs. actual refresh times

#### Consistency
Measures uniformity across related datasets.

**Checks**:
- Cross-dataset validation
- Format standardization
- Reference data alignment

#### Accuracy
Measures correctness against known sources of truth.

**Validation**:
- External reference checks
- Business rule verification
- Historical trend analysis

---

## 4. User Roles & Permissions

### Role Matrix

| Feature | IT Admin | Data Steward | Data Engineer | Business Analyst | Executive | Auditor |
|---------|----------|--------------|---------------|------------------|-----------|---------|
| View Dashboard | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| View Data Catalog | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Create Quality Rules | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Execute DQ Pipelines | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Auto-fix Data Issues | ✅ | ✅ | ⚠️ | ❌ | ❌ | ❌ |
| Manage Users | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| View Audit Logs | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Manage Connectors | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Export Data | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Access AI Copilot | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |

⚠️ = Limited/Approval Required

---

## 5. Module Documentation

### 5.1 Dashboard

#### Purpose
Central monitoring hub for data quality metrics and trends.

#### Key Features
- **Real-time KPIs**: Live updates of quality metrics
- **Trend Visualization**: 7-day quality score charts
- **Quick Actions**: Fast access to common tasks
- **Alert Summary**: Critical issues requiring attention

#### How to Use
1. **Monitor KPIs**: Check overall quality health at a glance
2. **Review Trends**: Identify quality improvements or degradation over time
3. **Check Alerts**: Address critical issues immediately
4. **Navigate Modules**: Use quick action buttons to access features

---

### 5.2 Data Catalog

#### Purpose
Centralized repository of all datasets with searchable, filterable interface.

#### Key Features
- **Search**: Full-text search across dataset names and descriptions
- **Filter**: By quality badge, domain, or custom criteria
- **Sort**: 8 sorting options for easy discovery
- **View Modes**: Grid or list view based on preference

#### Workflow

**Finding a Dataset:**
1. Use search bar to enter keywords
2. Apply filters for badge or domain
3. Sort results by quality score or date
4. Click dataset card to view details

**Understanding Dataset Cards:**
- **Header**: Dataset name and badge
- **Metrics**: Row count, column count, quality score
- **Quality Stats**: Completeness, validity, uniqueness percentages
- **Status**: Last modified date and health indicator

---

### 5.3 Data Cleaning Studio

#### Purpose
AI-powered interface for detecting and fixing data quality issues.

#### Tabs Overview

**1. Issues Tab**
- **What It Shows**: All detected data quality issues
- **Filters**: By severity (critical, high, medium, low) and type
- **Auto-fixable Indicator**: Shows which issues can be automatically resolved
- **Actions**: Select issue to view details and suggested fixes

**2. Operations Tab**
- **What It Shows**: Recommended cleaning operations
- **AI-Generated**: Operations suggested by AI copilot
- **Status Tracking**: Pending, running, completed, or failed
- **Impact Analysis**: Before/after quality metrics
- **Code Preview**: Generated Python/Pandas code

**3. Columns Tab**
- **What It Shows**: Column-level profiling and statistics
- **Metrics**: Data type, null rate, unique values, outliers
- **Patterns**: Detected format patterns
- **Recommendations**: Column-specific improvement suggestions

#### Step-by-Step: Cleaning Data

**Step 1: Review Issues**
```
1. Navigate to Data Cleaning module
2. Select dataset from dropdown
3. Click "Issues" tab
4. Review detected issues by severity
```

**Step 2: Select Operations**
```
1. Click "Operations" tab
2. Review AI-suggested operations
3. Examine before/after impact
4. Review generated code
```

**Step 3: Execute**
```
1. Click "Execute" for single operation
2. Or "Execute All" for batch processing
3. Monitor execution status
4. Review results and quality improvement
```

**Step 4: Verify**
```
1. Check updated quality metrics
2. Return to Issues tab to confirm resolution
3. Review Columns tab for improvements
```

#### Safety Features

**Auto-execution (Low Risk)**
- Email formatting standardization
- Phone number normalization
- Date format standardization
- Whitespace trimming

**Approval Required (High Risk)**
- Record deletion
- Value modification based on business logic
- Deduplication merging
- Data imputation

---

### 5.4 Rule Studio

#### Purpose
Create, manage, and test data quality validation rules.

#### Rule Templates

**1. Email Validation**
```python
# Validates email format and domain
pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
df['email_valid'] = df['email'].str.match(pattern)
```

**2. Phone Number Validation**
```python
# Validates US phone number format (XXX) XXX-XXXX
pattern = r'^\(\d{3}\) \d{3}-\d{4}$'
df['phone_valid'] = df['phone'].str.match(pattern)
```

**3. Null Check**
```sql
SELECT COUNT(*) as null_count
FROM dataset
WHERE critical_field IS NULL
```

**4. Range Validation**
```python
# Validates numeric ranges
df['age_valid'] = df['age'].between(0, 120)
df['amount_valid'] = df['amount'] >= 0
```

**5. Reference Integrity**
```sql
SELECT d.id, d.foreign_key
FROM dataset d
LEFT JOIN reference_table r ON d.foreign_key = r.id
WHERE r.id IS NULL
```

**6. Uniqueness Check**
```python
# Identifies duplicate records
duplicates = df[df.duplicated(subset=['key_field'], keep=False)]
```

**7. Format Standardization**
```python
# Standardizes date formats
df['date'] = pd.to_datetime(df['date'], format='%Y-%m-%d')
```

**8. Custom Business Rule**
```python
# Custom business logic validation
df['rule_valid'] = df.apply(
    lambda row: custom_validation_logic(row),
    axis=1
)
```

#### Creating Custom Rules

**Step 1: Select Template**
```
1. Navigate to Rule Studio
2. Browse rule templates
3. Select closest match to your need
```

**Step 2: Configure**
```
1. Set rule name and description
2. Select target dataset/columns
3. Define validation criteria
4. Set severity level
```

**Step 3: Generate Code**
```
1. Choose language (SQL, Pandas, Spark)
2. Review generated code
3. Customize if needed
4. Copy code to clipboard
```

**Step 4: Test**
```
1. Click "Test Rule"
2. Review validation results
3. Adjust parameters if needed
4. Save rule for future use
```

---

### 5.5 AI Copilot

#### Purpose
Intelligent assistant for data quality tasks and recommendations.

#### Capabilities

**1. Data Profiling Analysis**
```
User: "Analyze the customer_master dataset"
AI: Provides summary of quality issues, patterns, and recommendations
```

**2. Rule Generation**
```
User: "Create a rule to validate email addresses"
AI: Generates complete validation rule with code
```

**3. Data Cleaning Suggestions**
```
User: "How can I fix the missing phone numbers?"
AI: Suggests imputation strategies with code examples
```

**4. Code Generation**
```
User: "Generate Python code to standardize addresses"
AI: Provides complete, executable Python/Pandas script
```

**5. Anomaly Explanation**
```
User: "Why did quality score drop for sales_data?"
AI: Analyzes trends and identifies root causes
```

#### Best Practices

**Be Specific**
```
❌ "Fix my data"
✅ "Standardize phone numbers in customer_master to (XXX) XXX-XXXX format"
```

**Provide Context**
```
❌ "Create a rule"
✅ "Create a rule to validate that order_amount is positive and less than $1M"
```

**Review AI Suggestions**
```
1. Always review generated code before execution
2. Test on sample data first
3. Understand the logic before applying to production
```

---

### 5.6 DQA Pipeline

#### Purpose
Automated, scheduled execution of data quality checks.

#### Pipeline Components

**1. Data Source**
- Connection to source system
- Sampling strategy
- Refresh schedule

**2. Quality Rules**
- Validation rules to apply
- Execution order
- Dependency management

**3. Actions**
- Alert generation
- Auto-fix execution
- Report creation
- Notification dispatch

**4. Schedule**
- Frequency (hourly, daily, weekly)
- Execution window
- Retry logic

#### Creating a Pipeline

**Step 1: Define Source**
```
1. Select dataset or connector
2. Configure sampling (full or sample)
3. Set refresh schedule
```

**Step 2: Add Rules**
```
1. Drag rules from library
2. Arrange in execution order
3. Configure thresholds
```

**Step 3: Configure Actions**
```
1. Set alert thresholds
2. Enable auto-fix for low-risk issues
3. Configure notifications
```

**Step 4: Schedule**
```
1. Set execution frequency
2. Define time window
3. Enable monitoring
```

**Step 5: Execute & Monitor**
```
1. Run pipeline manually or wait for schedule
2. Monitor execution status
3. Review results
4. Adjust as needed
```

---

### 5.7 PII Masking

#### Purpose
Detect and mask personally identifiable information for compliance.

#### Supported PII Types

- **Direct Identifiers**
  - Name (first, last, full)
  - Email address
  - Phone number
  - Social Security Number
  - Driver's License
  - Passport number

- **Indirect Identifiers**
  - Date of Birth
  - ZIP code
  - IP address
  - Geographic coordinates

- **Sensitive Data**
  - Credit card numbers
  - Bank account numbers
  - Medical record numbers
  - Biometric data

#### Masking Strategies

**1. Redaction**
```
Original: john.doe@example.com
Masked:   [REDACTED]
```

**2. Partial Masking**
```
Original: 555-123-4567
Masked:   555-XXX-XXXX
```

**3. Tokenization**
```
Original: john.doe@example.com
Masked:   token_a8f9e2b1c5d3
```

**4. Hashing**
```
Original: john.doe@example.com
Masked:   sha256_9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
```

**5. Format-Preserving Encryption**
```
Original: 555-123-4567
Masked:   892-746-1203
```

#### Compliance Frameworks

- **GDPR**: EU General Data Protection Regulation
- **CCPA**: California Consumer Privacy Act
- **HIPAA**: Health Insurance Portability and Accountability Act
- **SOX**: Sarbanes-Oxley Act
- **PCI-DSS**: Payment Card Industry Data Security Standard

---

## 6. Best Practices

### Data Quality Strategy

**1. Start Small**
- Begin with critical datasets
- Focus on high-impact issues
- Gradually expand coverage

**2. Define Clear Thresholds**
- Set realistic quality targets
- Align with business requirements
- Review and adjust regularly

**3. Automate Where Possible**
- Enable auto-fix for low-risk issues
- Schedule regular quality checks
- Set up proactive alerts

**4. Involve Stakeholders**
- Collaborate with data owners
- Communicate quality metrics
- Establish accountability

**5. Continuous Improvement**
- Monitor quality trends
- Learn from incidents
- Update rules and processes

### Performance Optimization

**1. Dataset Selection**
- Profile new datasets immediately
- Prioritize business-critical data
- Archive unused datasets

**2. Rule Efficiency**
- Optimize complex validation logic
- Use sampling for large datasets
- Cache frequently-used results

**3. Pipeline Scheduling**
- Avoid peak hours
- Distribute load across time
- Use incremental processing

---

## 7. FAQs

**Q: How often should I run quality checks?**
A: Depends on data criticality and change frequency. Recommended: Daily for critical datasets, weekly for others.

**Q: Can I revert data cleaning operations?**
A: Yes, all operations are logged with before/after snapshots. Contact admin for restoration.

**Q: How does AI Copilot learn from my data?**
A: AI analyzes patterns, business rules, and historical fixes to provide context-aware suggestions. Your data remains private.

**Q: What happens if a quality check fails?**
A: Alerts are generated based on severity. Critical failures can block downstream processes.

**Q: Can I integrate StarDQ with existing data pipelines?**
A: Yes, via REST API and webhook integrations. Contact support for API documentation.

**Q: How is data security ensured?**
A: End-to-end encryption, role-based access control, comprehensive audit logging, and compliance with industry standards.

---

## 8. Support

### Getting Help

**Documentation**: [docs.stardq.com](https://docs.stardq.com)
**Email Support**: support@stardq.com
**Community Forum**: [community.stardq.com](https://community.stardq.com)
**Emergency Hotline**: 1-800-STAR-DQ1

### Response Times

- **Critical (P1)**: 2 hours
- **High (P2)**: 8 hours
- **Medium (P3)**: 24 hours
- **Low (P4)**: 48 hours

### Training Resources

- **Video Tutorials**: [learn.stardq.com](https://learn.stardq.com)
- **Webinars**: Monthly product updates
- **Certification**: StarDQ Professional Certification Program

---

*Document Version 2.0 | Last Updated: November 2025*
*© 2025 StarDQ. All rights reserved.*
