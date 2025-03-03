import { Dimensions, StyleSheet, Text, View, FlatList, ImageBackground } from 'react-native';
import { useMyContext } from '../Context';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

export default function TodayScreen() {
    const {weatherhourly, citycoords, showContent, errorMsg}  = useMyContext()
    return(
    //     <ImageBackground
    //     source={require('../assets/background.jpg')}
    //     style={styles.background}
    //   >
        <View>
  <LineChart
    data={{
      labels: ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"],
      datasets: [
        {
          data: [
            0,
            2,
            4,
            6,
            8,
            10,
            12,
            14,
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    // yAxisLabel="$"
    yAxisSuffix="C"
    yAxisInterval={1} 
    // xAxisInterval={2}// optional, defaults to 1
    chartConfig={{
      backgroundColor: "#1E2923",
      backgroundGradientFrom: "transparent",
      backgroundGradientTo: "transparent",
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16,
        // background: 'transparent'
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
</View>
        // </ImageBackground>
    )
  }
  
const styles = StyleSheet.create({
    background: {
        flex: 1, // Make sure the background image covers the entire screen
        justifyContent: 'center',
        alignItems: 'center',
      },
    container: {
      flex: 1,
    //   paddingTop: 50,
      alignItems: 'center',
    },
    showContent : {
        paddingTop: 20,
    },
    text : {
        color: "gray",
        fontSize: 20,
        textAlign: 'center',
    },
    showerror : {
        width : '100%',
        justifyContent: 'center',
        position: 'absolute',
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
      },
      error : {
        fontSize: 20,
        fontWeight: "800",
        color: "red",
        textAlign: 'center',
    },
    weathercontainer : {
        flex: 1,
        flexDirection: "row",
        gap : wp(25),
        justifyContent: "space-around",
        marginBottom: wp(2),
        marginTop : wp(3),
    },
    weathertext : {
        fontSize: 16,
        color: "gray",
        // flexGrow: 1,
    },
});