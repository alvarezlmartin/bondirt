import React, { useState, useEffect, useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { Appbar, Text, List, Divider, Provider as PaperProvider } from 'react-native-paper';
import { Dropdown } from 'react-native-paper-dropdown';
import Animated, { FadeOutUp, FadeInUp } from 'react-native-reanimated';

interface Horario {
  time: string;
  destination: string;
}

const PARADA_OPTIONS = [
  { label: 'Parada 1', value: 'parada1' },
  { label: 'Parada 2', value: 'parada2' },
  { label: 'Parada 3', value: 'parada3' },
];

const DAY_OPTIONS = [
  { label: 'Lunes a Viernes', value: 'weekday' },
  { label: 'Sábados', value: 'saturday' },
  { label: 'Domingos', value: 'sunday' },
];

const HORARIOS_DATA: Record<string, Horario[]> = {
  parada1: [
    { time: '08:00 AM', destination: 'Station A' },
    { time: '09:30 AM', destination: 'Station B' },
    { time: '10:00 AM', destination: 'Station C' },
    { time: '10:00 AM', destination: 'Station C' },
    { time: '10:00 AM', destination: 'Station C' },
    { time: '10:00 AM', destination: 'Station C' },
  ],
  parada2: [
    { time: '10:00 AM', destination: 'Station C' },
    { time: '11:30 AM', destination: 'Station D' },
  ],
  parada3: [
    { time: '01:00 PM', destination: 'Station E' },
    { time: '02:30 PM', destination: 'Station F' },
  ],
};

const HorariosScreen = () => {
  const [parada, setParada] = useState<string | undefined>();
  const [dayType, setDayType] = useState<string>();
  const [horarios, setHorarios] = useState<Horario[]>([]);

  useEffect(() => {
    const today = new Date().getDay();
    setDayType(today === 6 ? 'saturday' : today === 0 ? 'sunday' : 'weekday');
  }, []);

  useEffect(() => {
    setHorarios(parada ? HORARIOS_DATA[parada] || [] : []);
  }, [parada, dayType]);

  const renderHorarios = useMemo(
    () =>
      horarios.length > 0 ? (
        horarios.map((horario, index) => (
          <Animated.View
            key={index}
            entering={FadeInUp.springify().delay(100 * index)}
            exiting={FadeOutUp.springify()}
          >
            <List.Item title={horario.time} description={horario.destination} />
            <Divider />
          </Animated.View>
        ))
      ) : (
        <Text variant="titleLarge" style={{ margin: 16 }}>
          Seleccione una parada para ver los horarios.
        </Text>
      ),
    [horarios]
  );

  return (
    <PaperProvider>
      <Appbar.Header elevated>
        <Appbar.Content title="Horarios Completos" />
      </Appbar.Header>

      <View style={{ flex: 1, padding: 16 }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 90 }}>
          <View style={{ marginBottom: 10 }}>
            <Dropdown
              label="Parada"
              options={PARADA_OPTIONS}
              value={parada}
              onSelect={setParada}
              mode="flat"
            />
          </View>

          <View style={{ marginBottom: 10 }}>
            <Dropdown
              label="Día"
              options={DAY_OPTIONS}
              value={dayType}
              onSelect={setDayType}
              mode="flat"
            />
          </View>

          {renderHorarios}
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

export default HorariosScreen;
