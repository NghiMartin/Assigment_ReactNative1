import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS, SPACING } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PaymentFooter from '../components/PaymentFooter';
import CartItem from '../components/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { incrementCartItemQuantity, decrementCartItemQuantity, calculateCartPrice } from '../store/slice_control';
export default CartScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const CartList = useSelector((state) => state.Products.CartList);
  const CartPrice = useSelector((state) => state.Products.CartPrice);
  const incrementCartItemQuantity1 =(id,size) => dispatch(incrementCartItemQuantity(id,size));
  const decrementCartItemQuantity1 =(id,size) => dispatch(decrementCartItemQuantity(id,size));

  const calculateCartPrice1 = () => dispatch(calculateCartPrice());
  const tabBarHeight = useBottomTabBarHeight();

  const buttonPressHandler = () => {
    navigation.push('Payment', { amount: CartPrice });
  };

  const incrementCartItemQuantityHandler = (id, size) => {
    incrementCartItemQuantity1(id, size);
    calculateCartPrice1();
  };

  const decrementCartItemQuantityHandler = (id, size) => {
    decrementCartItemQuantity1(id, size);
    calculateCartPrice1();
  };
  
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <View style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title="Cart" />

            {CartList.length == 0 ? (
              <EmptyListAnimation title={'Cart is Empty'} />
            ) : (
              <View style={styles.ListItemContainer}>
                {CartList.map((data) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push('Details', {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}
                    key={data.id}
                  >
                    <CartItem
                      id={data.id}
                      name={data.name}
                      imagelink_square={data.imagelink_square}
                      special_ingredient={data.special_ingredient}
                      roasted={data.roasted}
                      prices={data.prices}
                      type={data.type}
                      incrementCartItemQuantityHandler={incrementCartItemQuantityHandler}
                      decrementCartItemQuantityHandler={decrementCartItemQuantityHandler}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {CartList.length != 0 ? (
            <PaymentFooter
              buttonPressHandler={buttonPressHandler}
              buttonTitle="Pay"
              price={{ price: CartPrice, currency: '$' }}
            />
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer: {
    flex: 1,
  },
  ListItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
});

