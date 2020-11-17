//  ----------------------------------------------------------------------------
//  Dependencies
//  ----------------------------------------------------------------------------
import styled from 'styled-components';
import color from './color';

//  ----------------------------------------------------------------------------
//  Styles
//  ----------------------------------------------------------------------------
//
//  Styles written for Audio
//
export const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: 10px;
  display: grid;
  grid-template-columns: 50px 30px auto 30px;
  grid-column-gap: 10px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  border: none;
  border-radius: 4px;
`

export const AudioButton = styled.div`
  height: 40px;
  width: 40px;
  border: none;
  border-radius: 50%;
  background-color: ${color.black200};
  color: ${color.white};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`

export const AudioText = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Helvetica;
  font-size: 14px;
  font-weight: normal;
`

export const AudioWave = styled.div`
  height: 100%;
`
