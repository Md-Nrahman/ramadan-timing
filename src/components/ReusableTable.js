import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  cascadeDate,
  replaceNumbers,
  replaceTimeString,
} from "./showDateInBangla";
import { showDayInBangla } from "./showDayInBangla";

const ReusableTable = ({ ramadanData, firstNumber, lastNumber }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>রোজা</th>
          <th>তারিখ</th>
          <th>বার</th>
          <th>সাহরীর শেষ সময়</th>
          <th>ইফতারের সময়</th>
        </tr>
      </thead>
      <tbody>
        {ramadanData?.length ? (
          ramadanData?.map((single, index) => (
            <>
              {index >= firstNumber && index <= lastNumber && (
                <tr>
                  <td>{replaceNumbers((index + 1).toString())}</td>
                  <td>{cascadeDate(single.date)}</td>
                  <td>{showDayInBangla(single.date)}</td>
                  <td>{"সকাল " + replaceTimeString(single.sahri)}</td>
                  <td>{"সন্ধ্যা " + replaceTimeString(single.iftar)}</td>
                </tr>
              )}
            </>
          ))
        ) : (
          <tr>
            {Array(5)
              ?.fill()
              ?.map((single) => (
                <>
                  <td>
                    {Array(3)
                      ?.fill()
                      ?.map((single) => (
                        <Skeleton
                          baseColor="#d4d6de"
                          highlightColor="#a9adbd"
                          duration={2}
                        />
                      ))}
                  </td>
                </>
              ))}
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ReusableTable;
