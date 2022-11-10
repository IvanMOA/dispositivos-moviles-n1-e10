import { ScrollView, Spinner, Text, View } from "native-base";
import { BarChart, LineChart, PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { Colors } from "../../values/colors";
import { useI18n } from "../../components/I18nProvider";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { orderBy, query } from "firebase/firestore";
import { productsCollection } from "../../firebase";
import { productConverter } from "../../models/product";
import React from "react";
import { userUserStore } from "../../stores/UserStore";
const screenWidth = Dimensions.get("window").width;

function getPast7DaysDates() {
  const todayDate = new Date().getDate();
  const dates = [];
  for (let i = todayDate - 6; i <= todayDate; i++) {
    dates.push(i);
  }
  return dates;
}
function getPast7DaysProductsSales(products) {
  const days = getPast7DaysDates();
  const sales = new Array(7).fill(0);
  for (const product of products) {
    for (const soldDate of product.soldDates) {
      const soldAtDayIndex = days.findIndex(
        (day) => day === soldDate.getDate()
      );
      if (soldAtDayIndex === -1) continue;
      sales[soldAtDayIndex] += 1;
    }
  }
  return sales;
}
function productSales(product) {
  return product.soldDates.length;
}
function get3MostSoldItems(products) {
  const salesPerProductTitle = new Map();
  for (const product of products) {
    const sales = salesPerProductTitle.get(product.title);
    if (sales === undefined) {
      salesPerProductTitle.set(product.title, productSales(product));
      continue;
    }
    salesPerProductTitle.set(product.title, productSales(product) + 1);
  }
  return Array.from(salesPerProductTitle)
    .sort(([_, a], [__, b]) => {
      console.log(a, b);
      if (a < b) return -1;
      if (a >= b) return 1;
      return 0;
    })
    .reverse()
    .slice(0, 3);
}
export default function SellerStatistics() {
  const { t } = useI18n();
  const { user } = userUserStore();
  const [products, isFetchingProducts, fetchProductsError] = useCollectionData(
    query(
      productsCollection(user.id).withConverter(productConverter),
      orderBy("createdAt", "asc")
    )
  );
  if (isFetchingProducts) return <Spinner mt={5} />;
  console.log(products);
  const salesPerDayData = {
    labels: getPast7DaysDates(),
    datasets: [
      {
        data: getPast7DaysProductsSales(products),
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
  const salesPerMonthData = {
    labels: ["Julio", "Agosto", "Septiembre", "Octubre", "Noviembre"],
    datasets: [
      {
        data: [
          0,
          0,
          0,
          0,
          products.map((product) => product.soldDates).flat().length,
        ],
      },
    ],
  };
  const top3Sales = get3MostSoldItems(products);
  console.log(top3Sales);
  const mostSoldProducts = {
    labels: top3Sales.map(([title]) => title),
    datasets: [
      {
        data: top3Sales.map(([_, sales]) => sales),
      },
    ],
  };
  return (
    <ScrollView>
      <Text fontSize={18} color="gray.600" fontWeight="bold" mx={3} my={5}>
        {t("sales_per_day")}
      </Text>
      <LineChart
        data={salesPerDayData}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
      />
      <Text fontSize={18} color="gray.600" fontWeight="bold" mx={3} my={5}>
        {t("sales_per_month")}
      </Text>
      <BarChart
        data={salesPerMonthData}
        width={screenWidth}
        height={320}
        chartConfig={chartConfig}
        verticalLabelRotation={30}
      />
      <Text fontSize={18} color="gray.600" fontWeight="bold" mx={3} my={5}>
        {t("last_week_most_sold_items")}
      </Text>
      <BarChart
        data={mostSoldProducts}
        width={screenWidth}
        height={420}
        chartConfig={chartConfig}
        verticalLabelRotation={30}
      />
      <View my={5}></View>
    </ScrollView>
  );
}
