import { Card, CardContent } from "@mui/material"
import { alpha, useTheme } from "@mui/material/styles"
import { styled } from "@mui/system";
import ApexChart from 'react-apexcharts';

const useChartOptions = () => {
  const theme = useTheme()

  return {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
      type: 'solid',
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      bar: {
        columnWidth: '10px',
      },
    },
    stroke: {
      colors: ['transparent'],
      show: true,
      width: 2,
    },
    theme: {
      mode: theme.palette.mode,
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true,
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true,
      },
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value: number) => (value > 0 ? `${value}K` : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
  }
}

const Chart1 = styled(ApexChart)``
const chartOptions = useChartOptions()

const Chart = () => {
  return (
    <Card>
      <CardContent>
        <Chart1
          height={350}
          options={chartOptions}
          series={[
            {
              name: 'This year',
              data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20]
            },
            {
              name: 'Last year',
              data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13]
            }
          ]}
          type="bar"
          width="100%"
        />
      </CardContent>
    </Card>
  )
}

export default Chart