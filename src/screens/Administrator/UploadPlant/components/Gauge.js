import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router';

import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  display: flex;
  width: 80%;
  height: 40px;
  margin: 0 auto;
  border-radius: 30px;
  background-color: ${props => props.bgColor};
  /* background-color: rgba(100, 100, 100, 0.1); */
  overflow: hidden;
`;

const Span = styled.button`
  position: relative;
  width: 20%;
  height: 40px;
  /* background-color: ${props => props.accentColor}; */
  background-color: transparent;
  cursor: ${props => (props.noCursor ? 'inherit' : 'pointer')};
  border-right: 1px solid ${props => props.theme.bgColor};
  box-sizing: border-box;
  z-index: 1;
  &:nth-child(2n) {
    border-right: 2px solid #fff;
  }
  &:last-of-type {
    border: none;
  }
`;

const GaugeItem = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 40px;
  width: ${props => props.customwidth}%;
  /* background-color: ${props => props.accentColor}; */
  background: ${props => props.background};
  opacity: 0.7;
  z-index: 0;
  transition: width 0.5s;
`;

let gaugeArr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const Gauge = ({ bgColor, accentColor, setGauge, background, percentage }) => {
  const { pathname } = useLocation();
  const pathArr = pathname.split('/');
  const pageState = pathArr[pathArr.length - 2];
  const [width, setWidth] = useState(pageState === 'edit' ? '' : 20);
  const [isUpload, setIsUpload] = useState(false);
  const onButtonClick = (e, item) => {
    e.preventDefault();
    setWidth(item);
    setGauge(item);
  };

  useEffect(() => {
    if (pathname.indexOf('upload') > 0 || pathname.indexOf('edit') > 0) {
      setIsUpload(true);
    } else {
      setIsUpload(false);
      setWidth(percentage);
    }

    if (pageState === 'edit') {
      setWidth(percentage);
    }

    return () => {
      setIsUpload(false);
    };
  }, [pathname, percentage, pageState]);

  return (
    <Container bgColor={bgColor}>
      {gaugeArr.map((item, index) => {
        let spanKey = `button${index}`;
        return (
          (isUpload && (
            <Span
              key={spanKey}
              accentColor={accentColor}
              onClick={e => onButtonClick(e, item)}
            />
          )) || <Span key={spanKey} accentColor={accentColor} noCursor />
        );
      })}
      <GaugeItem
        accentColor={accentColor}
        background={background}
        customwidth={width}
      />
    </Container>
  );
};

export default Gauge;
