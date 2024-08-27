import React, { useState } from 'react';
import { Button, View, StyleSheet } from 'react-native';
import Torch from 'react-native-torch';

const FlashlightToggle = () => {
  const [isTorchOn, setIsTorchOn] = useState(false);

  const toggleTorch = () => {
    Torch.switchState(!isTorchOn);
    setIsTorchOn(!isTorchOn);
  };

  return (
    <View style={styles.container}>
      <Button
        title={isTorchOn ? "Turn Off" : "Turn On"}
        onPress={toggleTorch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FlashlightToggle;
