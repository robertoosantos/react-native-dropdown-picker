import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Dialog,
  PaperProvider,
  Portal,
  Text,
} from 'react-native-paper';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollArea: {
    paddingHorizontal: 0,
  },
  dropdownWrapper: {
    zIndex: 1000,
    minHeight: 250,
    paddingHorizontal: 24,
  },
  selectedText: {
    paddingHorizontal: 24,
    paddingTop: 12,
  },
});

export default function PaperDialogExample(): JSX.Element {
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string | null>(null);
  const [items, setItems] = useState<Array<ItemType<string>>>([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Nectarines', value: 'nectarines' },
    { label: 'Kiwis', value: 'kiwis' },
    { label: 'Raspberries', value: 'raspberries' },
    { label: 'Pears', value: 'pears' },
  ]);

  const showDialog = (): void => setDialogVisible(true);
  const hideDialog = (): void => {
    setOpen(false);
    setDialogVisible(false);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text variant="bodyLarge">
          Selected fruit: {value ?? 'none'}
        </Text>
        <Button mode="contained" onPress={showDialog} style={{ marginTop: 16 }}>
          Open Dialog
        </Button>

        <Portal>
          <Dialog visible={dialogVisible} onDismiss={hideDialog}>
            <Dialog.Title>Choose a fruit</Dialog.Title>
            <Dialog.ScrollArea style={styles.scrollArea}>
              <View style={styles.dropdownWrapper}>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  placeholder="Select a fruit"
                  listMode="SCROLLVIEW"
                />
              </View>
              <Text style={styles.selectedText}>
                Currently selected: {value ? JSON.stringify(value) : 'nothing'}
              </Text>
            </Dialog.ScrollArea>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
  );
}
