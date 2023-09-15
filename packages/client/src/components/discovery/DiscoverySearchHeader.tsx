import { css } from "@emotion/react";
import { FC } from "react";
import DiscoveryBg from "@src/assets/bg/discovery-bg.svg";
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
        padding: 32px 16px 32px 32px;
        flex: 1;
      `}
    >
      <div
        css={css`
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 317px;
          p {
            margin-top: 8px;
          }
        `}
      >
        <DiscoveryBg
          css={css`
            position: absolute;
            inset: 0;
            z-index: 0;
            height: 100%;
          `}
        />
        <div
          css={css`
            position: relative;
            z-index: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
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
    </div>
  );
};
