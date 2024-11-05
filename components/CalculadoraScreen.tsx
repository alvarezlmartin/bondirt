import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { PaperProvider, Appbar, Card, Text, useTheme } from 'react-native-paper';
import { Dropdown } from 'react-native-paper-dropdown';
import { AnimatedNumber } from '@moxorama/reanimated-numbers';
import Animated, { FlipInEasyX } from 'react-native-reanimated';

const TRAMO_OPTIONS = [
  { label: 'RT<->CR', value: 'RT<->CR' },
  { label: 'RT<->Av Constituyentes', value: 'RT<->Av Constituyentes' },
];

const generateOptions = (length: number) =>
  Array.from({ length }, (_, i) => ({ label: `${i + 1}`, value: `${i + 1}` }));

export default function CalculadoraScreen() {
  const [tramo, setTramo] = useState('');
  const [colectivosPorDia, setColectivosPorDia] = useState('');
  const [diasPorSemana, setDiasPorSemana] = useState('');
  const [semanasPorMes, setSemanasPorMes] = useState('');
  const [resultado, setResultado] = useState<number | null>(null);
  const theme = useTheme();

  const calcularCosto = useCallback(() => {
    if (tramo && colectivosPorDia && diasPorSemana && semanasPorMes) {
      const costoPorColectivo = tramo === 'RT<->CR' ? 1400 : 1100;
      const total =
        Number(colectivosPorDia) * Number(diasPorSemana) * Number(semanasPorMes) * costoPorColectivo;
      setResultado(total);
    } else {
      setResultado(null);
    }
  }, [tramo, colectivosPorDia, diasPorSemana, semanasPorMes]);

  useEffect(() => {
    calcularCosto();
  }, [calcularCosto]);

  const renderDropdown = (label: string, value: string, setValue: (value: string) => void, options: { label: string; value: string }[]) => (
    <View style={styles.dropdown}>
      <Dropdown
        label={label}
        placeholder={`Seleccione ${label}`}
        options={options}
        value={value}
        onSelect={(value) => setValue(value || '')}
        mode="flat"
      />
    </View>
  );

  return (
    <PaperProvider>
      <Appbar.Header elevated>
        <Appbar.Content title="Calculadora de Costos" />
      </Appbar.Header>

      <View style={styles.container}>
        {renderDropdown('Tramo', tramo, setTramo, TRAMO_OPTIONS)}
        {renderDropdown('Colectivos por Día', colectivosPorDia, setColectivosPorDia, generateOptions(6))}
        {renderDropdown('Días por Semana', diasPorSemana, setDiasPorSemana, generateOptions(7))}
        {renderDropdown('Semanas por Mes', semanasPorMes, setSemanasPorMes, generateOptions(4))}

        {resultado !== null ? (
          <Animated.View entering={FlipInEasyX.springify()}>
            <Card style={styles.resultCard}>
              <Card.Content style={styles.resultContainer}>
                <Text style={styles.dollarSign}>$</Text>
                <AnimatedNumber
                  value={resultado}
                  fontSize={48}
                  duration={750}
                  format={new Intl.NumberFormat('es-AR')}
                  textStyle={{ color: theme.colors.onSurface }}
                />
              </Card.Content>
            </Card>
          </Animated.View>
        ) : (
          <Text variant="titleLarge" style={styles.infoText}>Ingrese los valores para calcular su costo.</Text>
        )}
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  dropdown: {
    marginBottom: 10,
  },
  resultCard: {
    marginTop: 10,
    paddingVertical: 10,
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dollarSign: {
    fontSize: 48,
    marginRight: 5,
    lineHeight: 48 * 1.2,
  },
  infoText: {
    margin: 16,
  },
});
