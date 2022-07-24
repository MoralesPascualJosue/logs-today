import React from "react";
import {Icon, IconProps, useColorMode, useColorModeValue} from "@chakra-ui/react";

const logo: React.FC<IconProps> = (props) => {
  const {toggleColorMode} = useColorMode();
  const logoColor = useColorModeValue("primary.500", undefined);

  return (
    <Icon
      color={logoColor}
      height={6}
      width={6}
      onClick={toggleColorMode}
      {...props}
      cursor="pointer"
      viewBox="0 0 250 250"
    >
      <g transform="translate(265 90)">
        <g transform="translate(-68 4)">
          <path
            className="b"
            d="M122.1,226.42a3.028,3.028,0,0,1-.392-.023,17.163,17.163,0,0,1-6.643-2.425,23.568,23.568,0,0,1-4.85-4,27.872,27.872,0,0,1-3.983-5.405H96.675L74.24,189.928l8.378,8.465H89.69l6.6-7.921L86.2,188.114l-12.587,1.128-.153-.168,6.373-20.938V133.088L68,117.157l33.682-61.9L68-.731a4.3,4.3,0,0,1,2.04-1.635C71.579-3.111,74.565-4,80.06-4c5.9,0,13.489,1,22.558,2.984A366.222,366.222,0,0,1,143.1,10.831l4.1,23.941L143.1,1.09l.013-.005c.429-.139,2.76-.875,6.529-1.7a116.092,116.092,0,0,1,17.126-2.389c.279-.019.574-.028.876-.028,5.521,0,12.474,3.2,21.255,9.773,2.708,2.028,5.2,4.079,7.205,5.727,2.856,2.349,4.919,4.046,5.6,4.046a.237.237,0,0,0,.175-.061.62.62,0,0,1,.4-.082,35.63,35.63,0,0,1,6.02,1.288c8.993,2.453,26.72,8.211,52.69,17.116,7.255,2.487,14.223,15.067,21.6,28.386,4.408,7.958,8.964,16.184,13.814,22.67,5.482,7.33,10.574,11.325,15.565,12.212a4.186,4.186,0,0,1,3.306,2.6c1.588,3.726-.038,11.363-4.832,22.7a333.964,333.964,0,0,1-17.418,34.014c-12.877,22.515-26.874,43.57-27.463,44.455l-.007.01H189.529L137.823,222.7l-.011,0C136.539,223.087,125.284,226.42,122.1,226.42Zm8.676-108.2-14.342,8.336c-.02.013-2.019,1.571-7.11,21.552h14.22l8.213-5.738,7.6-8.7,9.194-12.014-17.776-3.432h0Z"
            fill="currentColor"
            transform="translate(-268.556 -84.385)"
          />
          <line className="b" transform="translate(-2.5 117.5)" x2="21" y2="29" />
          <line className="b" transform="translate(-2.5 117.5)" y1="32" />
          <path
            className="b"
            d="M-9.5,149.5s-26.913,3.506-100.44-21.353"
            fill="currentColor"
            transform="translate(7)"
          />
          <path
            className="b"
            d="M11.5,146.5c6.15-5.913,15.049-23.084,22.725-43.227C46.111,72.08,54.883,33.807,44.829,21.4"
            fill="currentColor"
            transform="translate(7)"
          />
          <path
            className="b"
            d="M-74.314-68.068s5.385,1.723,9.047,12.278-10.124,20.463-9.047,24.771S-69.36-22.4-69.36-22.4"
            transform="translate(7)"
          />
        </g>
        <g fill="white" stroke="black" transform="translate(-455 -211)">
          <g className="c" transform="translate(276 141)">
            <ellipse className="d" cx="13.614" cy="13.15" rx="13.614" ry="13.15" />
            <ellipse className="f" cx="13.614" cy="13.15" rx="13.114" ry="12.65" />
          </g>
          <path
            className="c"
            d="M327.754,218.854c.954.157,3.484-1.764,3.484-1.764s3.94-3.763,3.857-3.881a17.538,17.538,0,0,1,3.36-2.744c.622-.235,1.161-.862,1.825-.549s-.622,2.234-.622,2.234-4.977,4.587-5.973,4.939S327.754,218.854,327.754,218.854Z"
            transform="translate(-41.393 -55.806)"
          />
          <path
            className="c"
            d="M332.581,189.99c.225-.862-.771-1.921-.771-1.921a7.331,7.331,0,0,0-3.277-2.587,10.218,10.218,0,0,0-5.516-.549c-2.862.431-2.827.429-2.827.429l-.2.119-.954,1.333-1.078.745a8.93,8.93,0,0,0,0,1.49,10.711,10.711,0,0,0,.249,3.724,7.493,7.493,0,0,0,1.244,2.862,17.719,17.719,0,0,1,.539,3.058"
            transform="translate(-33.504 -35.488)"
          />
          <path
            className="c"
            d="M307.756,177.545l-.448-.084v-.243a4.241,4.241,0,0,1-.592.106.464.464,0,0,1-.257-.422c.045-.137-.458-.3-.458-.3s-.346-.243-.257-.317.156-.211.257-.264-.38-.232-.38-.232-.257-.391.123-.433.156-.433.156-.433l-.581-.042s-.391-.253.369-.422,0-.306,0-.306l-.179-.084s-.212-.19-.123-.275a1.031,1.031,0,0,1,.447-.222c.145-.021.413-.38.235-.38s-.335-.475-.235-.538.581-.021.581.053.38-.158.3-.243-.458-.57-.3-.633.637.327.782.264-.436-.454-.145-.538a.465.465,0,0,1,.48.2s.458.032.279-.2.369-.5.413-.391.168.338.29.275.2-.507.413-.391a1.179,1.179,0,0,1,.413.391c.1.137.48-.053.48-.053l.357-.084a1.289,1.289,0,0,1,.19.454c.011.179.48-.063.48-.063h.335a2.647,2.647,0,0,1,.078.4c.011.158.447-.063.447-.063s.235-.148.268.3.3.211.3.211.3.063.235.549.235.486.235.486.212.127,0,.222"
            transform="translate(-23.369 -24.35)"
          />
          <path
            className="c"
            d="M323.855,238.516a3.217,3.217,0,0,0,1.322-.076"
            transform="translate(-37.874 -78.246)"
          />
          <path
            className="c"
            d="M326.156,240.395a3.146,3.146,0,0,0,1.418-.433,2.9,2.9,0,0,0,.6-.942"
            transform="translate(-39.97 -79.473)"
          />
        </g>
      </g>
    </Icon>
  );
};

export default logo;