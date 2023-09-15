import { css } from "@emotion/react";
import { FC } from "react";
import { CommonInput } from "@src/components/common/CommonInput.tsx";
import SearchIcon from "@src/assets/svg/search.svg";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const DiscoverySearchHeader: FC<Props> = ({ value, onChange }) => {
  return (
    <div
      css={css`
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 317px;
        p {
          margin-top: 8px;
        }
        img {
          position: absolute;
          top: 0;
          width: 100%;
          z-index: 0;
          object-fit: cover;
          height: 100%;
        }
      `}
    >
      <img src={"/bg/discovery-bg.svg"} alt="" />
      <div
        css={css`
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          h1 {
            font-size: 2vw;
            min-font-size: 24px;
          }
          p {
            font-size: 1.2vw;
            min-font-size: 14px;
          }
        `}
      >
        <h1>Discord에서 커뮤니티 찾기</h1>
        <p>게임, 음악, 학습까지. 원하는 걸 찾아보세요.</p>
        <CommonInput
          customCss={css`
            width: 500px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
            margin-top: 16px;
          `}
          value={value}
          placeholder={"커뮤니티 살펴보기"}
          onChange={(e) => onChange(e.target.value)}
          icon={<SearchIcon />}
        />
      </div>
    </div>
  );
};
