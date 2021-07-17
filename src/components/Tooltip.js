import React from 'react';
import TooltipTrigger from 'react-popper-tooltip';
import styled from 'styled-components';
import 'react-popper-tooltip/dist/styles.css';

const Arrow = styled.div`
  &::before {
    border-color: transparent transparent transparent transparent !important;
  }
  &::after {
    border-color: transparent transparent rgba(255, 255, 255, 0.5) transparent !important;
  }
`;

const Tooltip = ({
  idx,
  children,
  tooltip,
  hideArrow = true,
  backgroundColor,
  ...props
}) => (
  <TooltipTrigger
    {...props}
    tooltip={({
      arrowRef,
      tooltipRef,
      getArrowProps,
      getTooltipProps,
      placement,
      modifiers,
    }) => (
      <div
        {...getTooltipProps({
          ref: tooltipRef,
          className: 'tooltip-container',
          style: {
            border: 'none',
            boxShadow: '5px 5px 10px rgba(0,0,0,0.3)',
            backgroundColor: backgroundColor,
          },
        })}
      >
        {!hideArrow && (
          <Arrow
            {...getArrowProps({
              ref: arrowRef,
              className: 'tooltip-arrow',
              'data-placement': placement,
            })}
          />
        )}
        {tooltip}
      </div>
    )}
  >
    {({ getTriggerProps, triggerRef }) => (
      <span
        {...getTriggerProps({
          ref: triggerRef,
          className: `trigger${idx}`,
        })}
      >
        {children}
      </span>
    )}
  </TooltipTrigger>
);

export default Tooltip;
