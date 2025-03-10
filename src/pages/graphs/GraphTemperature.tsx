import { useEffect, useState } from "react";

export function GraphTemperature({ temperatures, chosenDay, tempScale }: { temperatures: any[], chosenDay: string, tempScale: string }) {
    const [CanvasJSChart, setCanvasJSChart] = useState<any>(null);

    useEffect(() => {
        // Dynamically import the module and assign the default export
        import("@canvasjs/react-charts").then((module) => {
            setCanvasJSChart(() => module.default); // Use default export
        });
    }, []);

    // Show loading state until the module is loaded
    if (!CanvasJSChart) {
        return <div>Loading Chart...</div>;
    }

    const filteredTemperatures = temperatures.filter(entry => entry.dayNum === chosenDay);

    if (filteredTemperatures?.length > 0) {
        const fullDay = `${filteredTemperatures[0].year}-${filteredTemperatures[0].month}-${filteredTemperatures[0].dayNum}`;
        
        const options = {
            animationEnabled: true,
            theme: "light2",
            title: {
                text: `Temperature Evolution ${fullDay}`
            },
            axisX: {
                valueFormatString: "HH:mm",
                intervalType: "hour",
                interval: 3
            },
            axisY: {
                title: "Temperature",
                suffix: tempScale
            },
            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer",
                itemclick: (e: any) => {
                    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
                        e.dataSeries.visible = false;
                    } else {
                        e.dataSeries.visible = true;
                    }
                    e.chart.render();
                }
            },
            data: [
                {
                    type: "line",
                    name: "Evolution",
                    showInLegend: true,
                    yValueFormatString: "#" + String(tempScale),
                    dataPoints: filteredTemperatures.map((entry: any, index) => ({
                        x: new Date(
                            parseInt(entry.year),
                            parseInt(entry.month) - 1,
                            parseInt(entry.dayNum),
                            parseInt(entry.hour)
                        ),
                        y: parseFloat(entry.temp),
                        key: index
                    }))
                }
            ]
        };

        return (
            <div>
                <CanvasJSChart options={options} />
            </div>
        );
    } else {
        return <div id="no_graph" className="graph-card"><p>No data available. Please insert a valid city</p></div>;
    }
}

export default GraphTemperature;