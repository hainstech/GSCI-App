import { TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';
import { Questionnaire } from '../../types';

export const QuestionnairesTouchableOpacity = styled.TouchableOpacity`
  background-color: #55b8ff;
  width: 50%;
  height: 50px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const QuestionnairesButtonText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
`;

export function QuestionnairesButton({
  title,
  onPress,
}: {
  title: string;
  onPress: TouchableOpacityProps['onPress'];
}) {
  return (
    <QuestionnairesTouchableOpacity onPress={onPress}>
      <QuestionnairesButtonText>{title}</QuestionnairesButtonText>
    </QuestionnairesTouchableOpacity>
  );
}