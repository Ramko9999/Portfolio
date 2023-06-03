work = [
    {
        "name": "stripe",
        "team": "Billing",
        "position": "SWE Intern",
        "from": "5/2022",
        "to": "8/2022",
        "background": "Billing offers the building blocks for merchants to develop their recurring products. For example, merchants like Netflix can use Billing to create and collect payments from their monthly subscription serice. My internship project involved enhancing the dashboard analytics for merchants' recurring products in 3 parts. Firstly, I added a drilldown for a new metric visible on the billing dashboard. Secondly, I drove the migration of the drilldown data from Presto to Apache Pinot, reducing the P95 drilldown latency from 54s to ~1s. Lastly, I shipped a setting, which if enabled, would provide merchants with a pessimistic forecast of subscription business, an ask from multiple merchants.",
        "tech": ["Apache Spark", "Apache Pinot", "React", "Scala", "SQL", "Typescript"],
        "display": {"background": "#635bff", "font": "Sohne", "text": "white"},
    },
    {
        "name": "Robinhood",
        "team": "Customer Care",
        "position": "SWE Intern",
        "from": "1/2022",
        "to": "5/2022",
        "background": "Specifically, I interned on Agent Experience, a sub-team within Customer Care that builds tools for customer service agents. There, I was responsible for designing and developing an user annotation store (UAS). An user annotation is a log made by RH's internal services to record an event of interest: user is flagged, user is added to a marketing promotion and etc... UAS powered a new annotation UI on the internal agent dashbord and supported the launch of 24/7 chat support.",
        "tech": ["Postgres", "Kafka", "Django", "Salesforce API", "Python"],
        "display": {"background": "#00c805", "font": "SequelSans", "text": "white"},
    },
    {
        "name": "amazon",
        "team": "Prime Video Ads",
        "position": "SWE Intern",
        "from": "6/2021",
        "to": "9/2021",
        "background": "The team I interned on was responsible for the telemetry of ads that would play in Prime Video. An issue that plagued the team was poor observability into which ad events (ad start, ad stop, ad pause and etc...) transpired. To tackle this, I developed a data pipeline with Apache Flink to aggregate ad logs and captured ad events. Ultimately, the output data was stored in Elasticsearch and exposed to the team through Kibana for ad-hoc querying, narrowing the detection time of ad reporting incidents from weeks to minutes.",
        "tech": ["Apache Flink", "Elasticsearch", "AWS Kinesis", "AWS Lambda", "Java"],
        "display": {"background": "#232f3e", "font": "Amazon", "text": "white"},
    },
    {
        "name": "MathWorks",
        "team": "Web Widgets",
        "position": "SWE Intern",
        "from": "1/2021",
        "to": "5/2021",
        "background": "The Web Widgets team maintains web UI components present across various surfaces in MathWorks. As a company, MathWorks began migrating from AMD to ES6 (JavaScript module formats) for development. I spearheaded this migration for the web UI components with an internal tool that converts AMD to ES6 and ES6 to AMD. I also extended the development infrastructure to support testing ES6 components and enabled their distribution.",
        "tech": ["Grunt", "Maven", "Babel", "Javascript"],
        "display": {"background": "#004b87", "font": "Hebrew", "text": "white"},
    },
    {
        "name": "TigerGraph",
        "team": "Customer Solutions",
        "position": "Architect Intern",
        "from": "7/2020",
        "to": "9/2020",
        "background": "TigerGraph's primary offering is a graph database in the cloud. As an architect intern, my primary role was to help customers use TigerGraph optimally for their business needs. My secondary role was to enhance TigerGraph's graph algorithm library by adding unit tests for each algorithm and implementing a new algorithm.",
        "tech": ["TigerGraph", "Python", "GSQL"],
        "display": {"background": "#ff6d00", "font": "Urbane", "text": "white"},
    },
    {
        "name": "Futurist Academy",
        "team": "OrgX",
        "position": "SWE Intern",
        "from": "8/2019",
        "to": "7/2020",
        "background": "Futurist Academy is a sanctuary for students to work on projects to showcase to the professional world for opportunities. During my time there, I helped prototype a new platform called OrgX. OrgX connects organizations, projects and people. I worked full-stack, from developing the React web UI to adding HTTP endpoints.",
        "tech": ["TigerGraph", "Firebase", "React", "Express", "Typescript"],
        "display": {"background": "#172a3f", "font": "Audiowide", "text": "white"},
    },
]
