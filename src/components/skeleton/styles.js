import { colors } from "../../constants";
import styled from "styled-components";

export const SkeletonPulse = styled.div`
  flex-shrink: 0;
  margin-top: ${(props) => props.mt};
  margin-right: ${(props) => props.mr};
  margin-left: ${(props) => props.ml};
  margin-bottom: ${(props) => props.mb};
  display: inline-block;
  width: ${(props) => `${props.width}`};
  height: ${(props) => `${props.height}`};
  background: linear-gradient(-90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%);

  background-size: 400% 400%;
  animation: pulse 1.2s ease-in infinite;
  overflow: hidden;
  border-radius: ${({ border }) => border && `${border}px`};
  @keyframes pulse {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: -140% 0%;
    }
  }
`;

export const SkeletonText = styled.div`
  height: 25px;
  width: 25px;
  margin: 13px 0;
`;

export const SkeletonInput = styled.div`
  margin-bottom: 20px;
  height: 40px;
  width: 280px;
`;

export const SkeletonTableWrapper = styled.div`
  width: 100%;
  border-collapse: collapse;
`;

export const SkeletonRow = styled.div`
  display: flex;
  border-bottom: 1px dashed #e4e6ef;

  @media screen and (max-width: 600px) {
    flex-wrap: wrap;
  }
`;

export const SkeletonCell = styled.div`
  margin: 8px 0;
  flex: ${(props) => (props.expand ? 2 : 1)};
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.alignRight ? "flex-end" : "flex-start")};
  color: ${colors.textOne};
  font-family: Lato;
  font-size: 15px;
  font-weight: 700;
  line-height: normal;
`;

export const SkeletonHeaderCell = styled(SkeletonCell)`
  font-weight: bold;
  color: ${colors.textThree};
  font-size: 12px;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.36px;
`;

export const Gap = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const SkeletonContainer = styled.div`
  flex: 1;

  .margin {
    margin-bottom: 8px;
  }

  .space {
    gap: 10px;
  }

  .value {
    color: #5e6278;
    font-size: 14px;
    font-weight: 700;
    line-height: normal;
  }
`;

export const SkeletonBg = styled.div`
  width: 8px;
  height: 3px;
  border-radius: 5px;

  &.female {
    background: #50cd89;
  }

  &.male {
    background: #e4e6ef;
  }
`;
