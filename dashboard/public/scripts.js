// Function to render the chart
function renderChart(labels, values, title) {
    const ctx = document.getElementById("chart").getContext("2d");

    // Clear existing chart if any
    if (window.myChart) {
        window.myChart.destroy();
    }

    // Create new chart
    window.myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: title,
                    data: values,
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}

// Function to update insights
function updateInsights(analysis) {
    const insightsElement = document.getElementById("insights-content");
    let insightsHtml = "";

    if (analysis === "average-order-value-by-region") {
        insightsHtml = `
            <h3>Average Order Value by Region Insights</h3>
            <h4>Question: How does average order value vary by region?</h4>
            <h4>Key Findings:</h4>
            <ul>
                <li>Arunachal Pradesh leads with the highest AOV at 999 INR, followed by Nagaland and Manipur.</li>
                <li>Regions like Andaman & Nicobar and Dadra and Nagar Haveli show significantly lower AOV.</li>
            </ul>
            <h4>Actionable Insights:</h4>
            <ul>
                <li>Focus premium campaigns on high-AOV regions to maximize revenue.</li>
                <li>Introduce value bundles and discounts to boost AOV in low-performing regions.</li>
                <li>Conduct demographic analysis to align product offerings with customer preferences in low-AOV areas.</li>
            </ul>
        `;
    } else if (analysis === "sales-trends") {
        insightsHtml = `
            <h3>Sales Trends Insights</h3>
            <h4>Question: What are the trends in sales, and why was April 2022 significant?</h4>
            <h4>Key Findings:</h4>
            <ul>
                <li>April 2022 showed a dramatic sales peak, likely due to promotions or seasonal factors.</li>
                <li>Sales declined steadily after April, highlighting challenges in sustaining momentum.</li>
            </ul>
            <h4>Actionable Insights:</h4>
            <ul>
                <li>Analyze April 2022 campaigns and replicate successful strategies during similar seasons.</li>
                <li>Use time-limited offers to sustain customer interest in post-peak months.</li>
                <li>Increase marketing around seasonal events to leverage customer buying patterns.</li>
            </ul>
        `;
    } else if (analysis === "revenue-by-category") {
        insightsHtml = `
            <h3>Revenue by Category Insights</h3>
            <h4>Question: Which product categories drive revenue, and how can low-performing categories improve?</h4>
            <h4>Key Findings:</h4>
            <ul>
                <li>Top-performing categories: Kurta and Set dominate revenue.</li>
                <li>Underperforming categories: Saree and Blouse contribute minimally.</li>
            </ul>
            <h4>Actionable Insights:</h4>
            <ul>
                <li>Increase inventory and marketing budgets for high-performing categories.</li>
                <li>Analyze reasons for low performance in underperforming categories and adjust pricing, designs, or availability.</li>
                <li>Experiment with bundles and promotions to revive low-performing categories.</li>
            </ul>
        `;
    } else if (analysis === "top-selling-products") {
        insightsHtml = `
            <h3>Top-Selling Products Insights</h3>
            <h4>Question: Which products contribute most to sales, and how can their success be sustained?</h4>
            <h4>Key Findings:</h4>
            <ul>
                <li>Top-selling SKUs consistently generate the highest revenue.</li>
                <li>Heavy reliance on a small group of SKUs for overall sales.</li>
            </ul>
            <h4>Actionable Insights:</h4>
            <ul>
                <li>Ensure continuous stock availability for top-performing SKUs.</li>
                <li>Expand the product line by introducing variations of high-demand SKUs.</li>
                <li>Analyze customer feedback to refine and enhance top-selling products.</li>
            </ul>
        `;
    } else if (analysis === "highest-sales-regions") {
        insightsHtml = `
            <h3>Regions with Highest Sales Insights</h3>
            <h4>Question: Which regions generate the highest sales, and how can others improve?</h4>
            <h4>Key Findings:</h4>
            <ul>
                <li>States like Maharashtra and Karnataka lead in total revenue.</li>
                <li>Regions like Lucknow and Kolkata underperform significantly.</li>
            </ul>
            <h4>Actionable Insights:</h4>
            <ul>
                <li>Focus marketing and promotions in top-performing regions to maintain growth.</li>
                <li>Enhance logistics and availability in underperforming regions to boost accessibility.</li>
                <li>Conduct regional surveys to identify specific barriers to sales growth.</li>
            </ul>
        `;
    } else if (analysis === "orders-fulfilled-by-amazon") {
        insightsHtml = `
            <h3>Orders Fulfilled by Amazon Insights</h3>
            <h4>Question: How does fulfillment type impact customer satisfaction and revenue?</h4>
            <h4>Key Findings:</h4>
            <ul>
                <li>Amazon Fulfilled orders dominate, ensuring reliability and customer trust.</li>
                <li>Merchant Fulfilled orders show lower performance, likely due to quality or timing issues.</li>
            </ul>
            <h4>Actionable Insights:</h4>
            <ul>
                <li>Train merchants to meet Amazon's quality benchmarks for fulfillment.</li>
                <li>Incentivize the adoption of Amazon's fulfillment services to enhance reliability.</li>
            </ul>
        `;
    } else if (analysis === "orders-with-promotions") {
        insightsHtml = `
            <h3>Orders with Promotions Insights</h3>
            <h4>Question: How do promotions affect order volumes?</h4>
            <h4>Key Findings:</h4>
            <ul>
                <li>Promotions account for a significant portion of orders, showcasing their effectiveness.</li>
                <li>Non-promotion orders still form a stable base, indicating consistent demand.</li>
            </ul>
            <h4>Actionable Insights:</h4>
            <ul>
                <li>Focus on high-ROI promotional strategies to drive sales.</li>
                <li>Balance promotional offers with regular pricing to ensure profitability.</li>
            </ul>
        `;
    } else if (analysis === "revenue-by-fulfillment") {
        insightsHtml = `
            <h3>Revenue by Fulfillment Type Insights</h3>
            <h4>Question: What fulfillment methods contribute most to revenue?</h4>
            <h4>Key Findings:</h4>
            <ul>
                <li>Amazon Fulfillment contributes the majority of revenue due to reliability.</li>
                <li>Merchant Fulfillment trails significantly, showing untapped potential.</li>
            </ul>
            <h4>Actionable Insights:</h4>
            <ul>
                <li>Support merchants with resources to improve their fulfillment capabilities.</li>
                <li>Promote Amazon Fulfillment to maintain customer trust and satisfaction.</li>
            </ul>
        `;
}


    insightsElement.innerHTML = insightsHtml;
}

// Function to load data and update visualization and insights
function loadAnalysis(analysis) {
    const endpointMapping = {
        "sales-trends": "sales-trends",
        "average-order-value-by-region": "average-order-value-by-region",
        "revenue-by-category": "revenue-by-category",
        "top-selling-products": "top-selling-products",
        "highest-sales-regions": "highest-sales-regions",
        "orders-fulfilled-by-amazon": "orders-fulfilled-by-amazon",
        "orders-with-promotions": "orders-with-promotions",
        "revenue-by-fulfillment": "revenue-by-fulfillment",
    };

    const endpoint = `https://dvivxtulwkvh.labs.coursera.org/serve/api/${endpointMapping[analysis]}`;
    console.log(`Fetching data from: ${endpoint}`);

fetch(endpoint)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`API call failed with status ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log(`Data received for ${analysis}:`, data);

        let labels = [];
        let values = [];

        // Map data based on analysis type
       if (analysis === "sales-trends") {
            labels = data.map((item) => item.Month);
            values = data.map((item) => item.TotalSales);
        } else if (analysis === "average-order-value-by-region") {
            labels = data.map((item) => item.ShipState);
            values = data.map((item) => item.AvgOrderValue);
        } else if (analysis === "revenue-by-category") {
            labels = data.map((item) => item.Category);
            values = data.map((item) => item.TotalRevenue);
        } else if (analysis === "top-selling-products") {
            labels = data.map((item) => `${item.SKU} (${item.Category})`);
            values = data.map((item) => item.TotalSales);
        } else if (analysis === "highest-sales-regions") {
            labels = data.map((item) => item.ShipState);
            values = data.map((item) => item.TotalRevenue);
        } else if (analysis === "orders-fulfilled-by-amazon") {
            labels = data.map((item) => item.FulfilledBy);
            values = data.map((item) => item.Percentage);
        } else if (analysis === "orders-with-promotions") {
            labels = data.map((item) => item.PromotionStatus);
            values = data.map((item) => item.OrderCount);
        } else if (analysis === "revenue-by-fulfillment") {
            labels = data.map((item) => item.FulfilledBy);
            values = data.map((item) => item.TotalRevenue);
        }

        // Render chart and update insights
        renderChart(labels, values, analysis.replace(/-/g, " ").toUpperCase());
        updateInsights(analysis);
    })
    .catch((error) => {
        console.error(`Error fetching data for ${analysis}:`, error);
        alert(`Failed to load data for ${analysis}. Please check the console for details.`);
    });

}

// Export to PDF
document.getElementById("export-pdf").addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    // Add header
    pdf.setFontSize(18);
    pdf.text("Amazon Sales Analysis", 105, 20, null, null, "center");

    // Add chart
    const chartCanvas = document.getElementById("chart");
    const chartImage = chartCanvas.toDataURL("image/png");
    pdf.addImage(chartImage, "PNG", 10, 30, 190, 100);

    // Add insights
    const insightsContent = document.getElementById("insights-content").innerText;
    const lines = pdf.splitTextToSize(insightsContent, 190);
    pdf.text(lines, 10, 140);

    // Save the PDF
    pdf.save("dashboard.pdf");
});

// Load default analysis
document.addEventListener("DOMContentLoaded", () => {
    const analyses = [
        "sales-trends",
        "average-order-value-by-region",
        "revenue-by-category",
        "top-selling-products",
        "highest-sales-regions",
        "orders-fulfilled-by-amazon",
        "orders-with-promotions",
        "revenue-by-fulfillment",
    ];

    const analysisSelect = document.getElementById("analysis");
    const loadButton = document.getElementById("load");

    loadButton.addEventListener("click", () => {
        const selectedAnalysis = analysisSelect.value;
        loadAnalysis(selectedAnalysis);
    });

    // Load the first analysis by default
    loadAnalysis(analyses[0]);
});
