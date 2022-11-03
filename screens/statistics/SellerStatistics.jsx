import { ScrollView, Text, View } from "native-base";
import { BarChart, LineChart, PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { Colors } from "../../values/colors";
const screenWidth = Dimensions.get("window").width;
export default function SellerStatistics() {
  const data = {
    labels: ["22", "23", "24", "25", "26", "27", "28"],
    datasets: [
      {
        data: [1, 3, 2, 4, 5, 3, 4],
        color: (opacity = 1) => Colors.primary["300"], // optional
        strokeWidth: 1, // optional
      },
    ],
  };
  const chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#FFFFFF",
    backgroundGradientToOpacity: 1,

    color: (opacity = 1) => Colors.primary["300"],
    strokeWidth: 2, // optional, default 3
    propsForDots: {
      r: 2,
      stroke: "#222222",
    },
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  const data2 = {
    labels: ["Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    datasets: [
      {
        data: [21, 12, 32, 53, 10],
      },
    ],
  };
  const data3 = {
    labels: ["Arduino UNO", "Sensor de movimiento", "Shield Ethernet"],
    datasets: [
      {
        data: [32, 15, 10],
      },
    ],
  };
  return (
    <ScrollView>
      <Text fontSize={18} color="gray.600" fontWeight="bold" mx={3} my={5}>
        Ventas por día
      </Text>
      <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
      />
      <Text fontSize={18} color="gray.600" fontWeight="bold" mx={3} my={5}>
        Ventas por mes
      </Text>
      <BarChart
        data={data2}
        width={screenWidth}
        height={320}
        chartConfig={chartConfig}
        verticalLabelRotation={30}
      />
      <Text fontSize={18} color="gray.600" fontWeight="bold" mx={3} my={5}>
        Productos más vendidos de la última semana
      </Text>
      <BarChart
        data={data3}
        width={screenWidth}
        height={420}
        chartConfig={chartConfig}
        verticalLabelRotation={30}
      />
      <View my={5}></View>
    </ScrollView>
  );
}
