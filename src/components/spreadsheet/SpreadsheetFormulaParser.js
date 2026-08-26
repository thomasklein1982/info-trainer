function Sprachepeg$parse(input, options) {
  options = options !== undefined ? options : {};

  const peg$FAILED = {};
  const peg$source = options.grammarSource;

  const peg$startRuleFunctions = {
    Term: peg$parseTerm,
  };
  let peg$startRuleFunction = peg$parseTerm;

  const peg$c0 = "(";
  const peg$c1 = ")";
  const peg$c2 = "=";
  const peg$c3 = "<";
  const peg$c4 = ">";
  const peg$c5 = "<>";
  const peg$c6 = "^";
  const peg$c7 = "-";
  const peg$c8 = ",";
  const peg$c9 = "\"";
  const peg$c10 = ";";
  const peg$c11 = "$";
  const peg$c12 = ":";
  const peg$c13 = " ";

  const peg$r0 = /^[+\-]/;
  const peg$r1 = /^[*\/]/;
  const peg$r2 = /^[0-9]/;
  const peg$r3 = /^[a-zA-Z]/;
  const peg$r4 = /^[A-Za-z_\xC4\xE4\xDC\xFC\xD6\xF6\xDF]/;
  const peg$r5 = /^[A-Za-z0-9_\xC4\xE4\xDC\xFC\xD6\xF6\xDF]/;

  const peg$e0 = peg$literalExpectation("(", false);
  const peg$e1 = peg$literalExpectation(")", false);
  const peg$e2 = peg$literalExpectation("=", false);
  const peg$e3 = peg$literalExpectation("<", false);
  const peg$e4 = peg$literalExpectation(">", false);
  const peg$e5 = peg$literalExpectation("<>", false);
  const peg$e6 = peg$classExpectation(["+", "-"], false, false, false);
  const peg$e7 = peg$classExpectation(["*", "/"], false, false, false);
  const peg$e8 = peg$literalExpectation("^", false);
  const peg$e9 = peg$classExpectation([["0", "9"]], false, false, false);
  const peg$e10 = peg$literalExpectation("-", false);
  const peg$e11 = peg$literalExpectation(",", false);
  const peg$e12 = peg$literalExpectation("\"", false);
  const peg$e13 = peg$literalExpectation(";", false);
  const peg$e14 = peg$literalExpectation("$", false);
  const peg$e15 = peg$classExpectation([["a", "z"], ["A", "Z"]], false, false, false);
  const peg$e16 = peg$literalExpectation(":", false);
  const peg$e17 = peg$classExpectation([["A", "Z"], ["a", "z"], "_", "\xC4", "\xE4", "\xDC", "\xFC", "\xD6", "\xF6", "\xDF"], false, false, false);
  const peg$e18 = peg$classExpectation([["A", "Z"], ["a", "z"], ["0", "9"], "_", "\xC4", "\xE4", "\xDC", "\xFC", "\xD6", "\xF6", "\xDF"], false, false, false);
  const peg$e19 = peg$literalExpectation(" ", false);

  function peg$f0(ALL_OF_IT) {let l=location(); let o={};o.name='Term'; o.text=text(); o.start=l.start.offset; o.end=l.end.offset; o.line=l.start.line;o.children=ALL_OF_IT; return o;  }
  function peg$f1(ALL_OF_IT) {let l=location(); let o={};o.name='Term3'; o.text=text(); o.start=l.start.offset; o.end=l.end.offset; o.line=l.start.line;o.children=ALL_OF_IT; return o;  }
  function peg$f2(ALL_OF_IT) {let l=location(); let o={};o.name='Term2'; o.text=text(); o.start=l.start.offset; o.end=l.end.offset; o.line=l.start.line;o.children=ALL_OF_IT; return o;  }
  function peg$f3(ALL_OF_IT) {let l=location(); let o={};o.name='Term1'; o.text=text(); o.start=l.start.offset; o.end=l.end.offset; o.line=l.start.line;o.children=ALL_OF_IT; return o;  }
  function peg$f4(ALL_OF_IT) {let l=location(); let o={};o.name='Term0'; o.text=text(); o.start=l.start.offset; o.end=l.end.offset; o.line=l.start.line;o.children=ALL_OF_IT; return o;  }
  function peg$f5(ALL_OF_IT) {let l=location(); let o={};o.name='Klammerausdruck'; o.text=text(); o.start=l.start.offset; o.end=l.end.offset; o.line=l.start.line;o.children=ALL_OF_IT; return o;  }
  function peg$f6(ALL_OF_IT) {let l=location(); let o={};o.name='CompOp'; o.text=text(); o.start=l.start.offset; o.end=l.end.offset; o.line=l.start.line;o.children=ALL_OF_IT; return o;  }
  function peg$f7(ALL_OF_IT) {let l=location(); let o={};o.name='ArithOp3'; o.text=text(); o.start=l.start.offset; o.end=l.end.offset; o.line=l.start.line;o.children=ALL_OF_IT; return o;  }
  function peg$f8(ALL_OF_IT) {let l=location(); let o={};o.name='ArithOp2'; o.text=text(); o.start=l.start.offset; o.end=l.end.offset; o.line=l.start.line;o.children=ALL_OF_IT; return o;  }
  function peg$f9(ALL_OF_IT) {let l=location(); let o={};o.name='ArithOp1'; o.text=text(); o.start=l.start.offset; o.end=l.end.offset; o.line=l.start.line;o.children=ALL_OF_IT; return o;  }
  function peg$f10(ALL_OF_IT) {let l=location(); let o={};o.name='PosGanzzahl'; o.text=text(); o.start=l.start.offset; o.end=l.end.offset; o.line=l.start.line;o.children=ALL_OF_IT; return o;  }
  function peg$f11(ALL_OF_IT) {let l=location(); let o={};o.name='Zahl'; o.text=text(); o.start=l.start.offset; o.end=l.end.offset; o.line=l.start.line;o.children=ALL_OF_IT; return o;  }
  function peg$f12(ALL_OF_IT) {let l=location(); let o={};o.name='Wert'; o.text=text(); o.start=l.start.offset; o.end=l.end.offset; o.line=l.start.line;o.children=ALL_OF_IT; return o;  }
  function peg$f13(ALL_OF_IT) {let l=location(); let o={};o.name='Funktionsaufruf'; o.text=text(); o.start=l.start.offset; o.end=l.end.offset; o.line=l.start.line;o.children=ALL_OF_IT; return o;  }
  function peg$f14(ALL_OF_IT) {let l=location(); let o={};o.name='Bezug'; o.text=text(); o.start=l.start.offset; o.end=l.end.offset; o.line=l.start.line;o.children=ALL_OF_IT; return o;  }
  function peg$f15(ALL_OF_IT) {let l=location(); let o={};o.name='Wort'; o.text=text(); o.start=l.start.offset; o.end=l.end.offset; o.line=l.start.line;o.children=ALL_OF_IT; return o;  }
  function peg$f16(ALL_OF_IT) {let l=location(); let o={};o.name='Functionname'; o.text=text(); o.start=l.start.offset; o.end=l.end.offset; o.line=l.start.line;o.children=ALL_OF_IT; return o;  }
  function peg$f17(ALL_OF_IT) {let l=location(); let o={};o.name='_'; o.text=text(); o.start=l.start.offset; o.end=l.end.offset; o.line=l.start.line;o.children=ALL_OF_IT; return o;  }
  let peg$currPos = options.peg$currPos | 0;
  let peg$savedPos = peg$currPos;
  const peg$posDetailsCache = [{ line: 1, column: 1 }];
  let peg$maxFailPos = peg$currPos;
  let peg$maxFailExpected = options.peg$maxFailExpected || [];
  let peg$silentFails = options.peg$silentFails | 0;

  let peg$result;

  if (options.startRule) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function text() {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function offset() {
    return peg$savedPos;
  }

  function range() {
    return {
      source: peg$source,
      start: peg$savedPos,
      end: peg$currPos,
    };
  }

  function location() {
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }

  function expected(description, location) {
    location = location !== undefined
      ? location
      : peg$computeLocation(peg$savedPos, peg$currPos);

    throw peg$buildStructuredError(
      [peg$otherExpectation(description)],
      input.substring(peg$savedPos, peg$currPos),
      location
    );
  }

  function error(message, location) {
    location = location !== undefined
      ? location
      : peg$computeLocation(peg$savedPos, peg$currPos);

    throw peg$buildSimpleError(message, location);
  }

  function peg$getUnicode(pos = peg$currPos) {
    const cp = input.codePointAt(pos);
    if (cp === undefined) {
      return "";
    }
    return String.fromCodePoint(cp);
  }

  function peg$literalExpectation(text, ignoreCase) {
    return { type: "literal", text, ignoreCase };
  }

  function peg$classExpectation(parts, inverted, ignoreCase, unicode) {
    return { type: "class", parts, inverted, ignoreCase, unicode };
  }

  function peg$anyExpectation() {
    return { type: "any" };
  }

  function peg$endExpectation() {
    return { type: "end" };
  }

  function peg$otherExpectation(description) {
    return { type: "other", description };
  }

  function peg$computePosDetails(pos) {
    let details = peg$posDetailsCache[pos];
    let p;

    if (details) {
      return details;
    } else {
      if (pos >= peg$posDetailsCache.length) {
        p = peg$posDetailsCache.length - 1;
      } else {
        p = pos;
        while (!peg$posDetailsCache[--p]) {}
      }

      details = peg$posDetailsCache[p];
      details = {
        line: details.line,
        column: details.column,
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;

      return details;
    }
  }

  function peg$computeLocation(startPos, endPos, offset) {
    const startPosDetails = peg$computePosDetails(startPos);
    const endPosDetails = peg$computePosDetails(endPos);

    const res = {
      source: peg$source,
      start: {
        offset: startPos,
        line: startPosDetails.line,
        column: startPosDetails.column,
      },
      end: {
        offset: endPos,
        line: endPosDetails.line,
        column: endPosDetails.column,
      },
    };
    if (offset && peg$source && (typeof peg$source.offset === "function")) {
      res.start = peg$source.offset(res.start);
      res.end = peg$source.offset(res.end);
    }
    return res;
  }

  function peg$fail(expected) {
    if (peg$currPos < peg$maxFailPos) { return; }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected);
  }

  function peg$buildSimpleError(message, location){ 
      return { message, location };
  }
  function peg$buildStructuredError(expected, found, location) {
      return {expected, found, location};
  }

  function peg$parseTerm() {
    let s0, s1, s2, s3, s4, s5, s6, s7, s8;

    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = peg$parseTerm3();
    if (s2 !== peg$FAILED) {
      s3 = [];
      s4 = peg$currPos;
      s5 = peg$parse_();
      s6 = peg$parseCompOp();
      if (s6 !== peg$FAILED) {
        s7 = peg$parse_();
        s8 = peg$parseTerm3();
        if (s8 !== peg$FAILED) {
          s5 = [s5, s6, s7, s8];
          s4 = s5;
        } else {
          peg$currPos = s4;
          s4 = peg$FAILED;
        }
      } else {
        peg$currPos = s4;
        s4 = peg$FAILED;
      }
      while (s4 !== peg$FAILED) {
        s3.push(s4);
        s4 = peg$currPos;
        s5 = peg$parse_();
        s6 = peg$parseCompOp();
        if (s6 !== peg$FAILED) {
          s7 = peg$parse_();
          s8 = peg$parseTerm3();
          if (s8 !== peg$FAILED) {
            s5 = [s5, s6, s7, s8];
            s4 = s5;
          } else {
            peg$currPos = s4;
            s4 = peg$FAILED;
          }
        } else {
          peg$currPos = s4;
          s4 = peg$FAILED;
        }
      }
      s2 = [s2, s3];
      s1 = s2;
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f0(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseTerm3() {
    let s0, s1, s2, s3, s4, s5, s6, s7, s8;

    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = peg$parseTerm2();
    if (s2 !== peg$FAILED) {
      s3 = [];
      s4 = peg$currPos;
      s5 = peg$parse_();
      s6 = peg$parseArithOp3();
      if (s6 !== peg$FAILED) {
        s7 = peg$parse_();
        s8 = peg$parseTerm2();
        if (s8 !== peg$FAILED) {
          s5 = [s5, s6, s7, s8];
          s4 = s5;
        } else {
          peg$currPos = s4;
          s4 = peg$FAILED;
        }
      } else {
        peg$currPos = s4;
        s4 = peg$FAILED;
      }
      while (s4 !== peg$FAILED) {
        s3.push(s4);
        s4 = peg$currPos;
        s5 = peg$parse_();
        s6 = peg$parseArithOp3();
        if (s6 !== peg$FAILED) {
          s7 = peg$parse_();
          s8 = peg$parseTerm2();
          if (s8 !== peg$FAILED) {
            s5 = [s5, s6, s7, s8];
            s4 = s5;
          } else {
            peg$currPos = s4;
            s4 = peg$FAILED;
          }
        } else {
          peg$currPos = s4;
          s4 = peg$FAILED;
        }
      }
      s2 = [s2, s3];
      s1 = s2;
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f1(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseTerm2() {
    let s0, s1, s2, s3, s4, s5, s6, s7, s8;

    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = peg$parseTerm1();
    if (s2 !== peg$FAILED) {
      s3 = [];
      s4 = peg$currPos;
      s5 = peg$parse_();
      s6 = peg$parseArithOp2();
      if (s6 !== peg$FAILED) {
        s7 = peg$parse_();
        s8 = peg$parseTerm1();
        if (s8 !== peg$FAILED) {
          s5 = [s5, s6, s7, s8];
          s4 = s5;
        } else {
          peg$currPos = s4;
          s4 = peg$FAILED;
        }
      } else {
        peg$currPos = s4;
        s4 = peg$FAILED;
      }
      while (s4 !== peg$FAILED) {
        s3.push(s4);
        s4 = peg$currPos;
        s5 = peg$parse_();
        s6 = peg$parseArithOp2();
        if (s6 !== peg$FAILED) {
          s7 = peg$parse_();
          s8 = peg$parseTerm1();
          if (s8 !== peg$FAILED) {
            s5 = [s5, s6, s7, s8];
            s4 = s5;
          } else {
            peg$currPos = s4;
            s4 = peg$FAILED;
          }
        } else {
          peg$currPos = s4;
          s4 = peg$FAILED;
        }
      }
      s2 = [s2, s3];
      s1 = s2;
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f2(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseTerm1() {
    let s0, s1, s2, s3, s4, s5, s6, s7, s8;

    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = peg$parseTerm0();
    if (s2 !== peg$FAILED) {
      s3 = [];
      s4 = peg$currPos;
      s5 = peg$parse_();
      s6 = peg$parseArithOp1();
      if (s6 !== peg$FAILED) {
        s7 = peg$parse_();
        s8 = peg$parseTerm0();
        if (s8 !== peg$FAILED) {
          s5 = [s5, s6, s7, s8];
          s4 = s5;
        } else {
          peg$currPos = s4;
          s4 = peg$FAILED;
        }
      } else {
        peg$currPos = s4;
        s4 = peg$FAILED;
      }
      while (s4 !== peg$FAILED) {
        s3.push(s4);
        s4 = peg$currPos;
        s5 = peg$parse_();
        s6 = peg$parseArithOp1();
        if (s6 !== peg$FAILED) {
          s7 = peg$parse_();
          s8 = peg$parseTerm0();
          if (s8 !== peg$FAILED) {
            s5 = [s5, s6, s7, s8];
            s4 = s5;
          } else {
            peg$currPos = s4;
            s4 = peg$FAILED;
          }
        } else {
          peg$currPos = s4;
          s4 = peg$FAILED;
        }
      }
      s2 = [s2, s3];
      s1 = s2;
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f3(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseTerm0() {
    let s0, s1;

    s0 = peg$currPos;
    s1 = peg$parseKlammerausdruck();
    if (s1 === peg$FAILED) {
      s1 = peg$parseWert();
      if (s1 === peg$FAILED) {
        s1 = peg$parseBezug();
      }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f4(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseKlammerausdruck() {
    let s0, s1, s2, s3, s4, s5, s6;

    s0 = peg$currPos;
    s1 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 40) {
      s2 = peg$c0;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e0); }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parse_();
      s4 = peg$parseTerm();
      if (s4 !== peg$FAILED) {
        s5 = peg$parse_();
        if (input.charCodeAt(peg$currPos) === 41) {
          s6 = peg$c1;
          peg$currPos++;
        } else {
          s6 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e1); }
        }
        if (s6 !== peg$FAILED) {
          s2 = [s2, s3, s4, s5, s6];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f5(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseCompOp() {
    let s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 61) {
      s1 = peg$c2;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e2); }
    }
    if (s1 === peg$FAILED) {
      s1 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 60) {
        s2 = peg$c3;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e3); }
      }
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 61) {
          s3 = peg$c2;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e2); }
        }
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        s2 = [s2, s3];
        s1 = s2;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 === peg$FAILED) {
        s1 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 62) {
          s2 = peg$c4;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e4); }
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 61) {
            s3 = peg$c2;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$e2); }
          }
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 2) === peg$c5) {
            s1 = peg$c5;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$e5); }
          }
        }
      }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f6(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseArithOp3() {
    let s0, s1;

    s0 = peg$currPos;
    s1 = input.charAt(peg$currPos);
    if (peg$r0.test(s1)) {
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e6); }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f7(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseArithOp2() {
    let s0, s1;

    s0 = peg$currPos;
    s1 = input.charAt(peg$currPos);
    if (peg$r1.test(s1)) {
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e7); }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f8(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseArithOp1() {
    let s0, s1;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 94) {
      s1 = peg$c6;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e8); }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f9(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parsePosGanzzahl() {
    let s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    s2 = input.charAt(peg$currPos);
    if (peg$r2.test(s2)) {
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e9); }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = input.charAt(peg$currPos);
        if (peg$r2.test(s2)) {
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e9); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f10(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseZahl() {
    let s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    s1 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 45) {
      s2 = peg$c7;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e10); }
    }
    if (s2 === peg$FAILED) {
      s2 = '';
    }
    if (s2 !== peg$FAILED) {
      s3 = [];
      s4 = input.charAt(peg$currPos);
      if (peg$r2.test(s4)) {
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e9); }
      }
      if (s4 !== peg$FAILED) {
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          s4 = input.charAt(peg$currPos);
          if (peg$r2.test(s4)) {
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$e9); }
          }
        }
      } else {
        s3 = peg$FAILED;
      }
      if (s3 !== peg$FAILED) {
        s4 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 44) {
          s5 = peg$c8;
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e11); }
        }
        if (s5 !== peg$FAILED) {
          s6 = [];
          s7 = input.charAt(peg$currPos);
          if (peg$r2.test(s7)) {
            peg$currPos++;
          } else {
            s7 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$e9); }
          }
          if (s7 !== peg$FAILED) {
            while (s7 !== peg$FAILED) {
              s6.push(s7);
              s7 = input.charAt(peg$currPos);
              if (peg$r2.test(s7)) {
                peg$currPos++;
              } else {
                s7 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$e9); }
              }
            }
          } else {
            s6 = peg$FAILED;
          }
          if (s6 !== peg$FAILED) {
            s5 = [s5, s6];
            s4 = s5;
          } else {
            peg$currPos = s4;
            s4 = peg$FAILED;
          }
        } else {
          peg$currPos = s4;
          s4 = peg$FAILED;
        }
        if (s4 === peg$FAILED) {
          s4 = '';
        }
        if (s4 !== peg$FAILED) {
          s2 = [s2, s3, s4];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f11(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseWert() {
    let s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$parseZahl();
    if (s1 === peg$FAILED) {
      s1 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 34) {
        s2 = peg$c9;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e12); }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parseWort();
        if (s3 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 34) {
            s4 = peg$c9;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$e12); }
          }
          if (s4 !== peg$FAILED) {
            s2 = [s2, s3, s4];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 === peg$FAILED) {
        s1 = peg$parseFunktionsaufruf();
      }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f12(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseFunktionsaufruf() {
    let s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;

    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = peg$parseFunctionname();
    if (s2 !== peg$FAILED) {
      s3 = peg$parse_();
      if (input.charCodeAt(peg$currPos) === 40) {
        s4 = peg$c0;
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e0); }
      }
      if (s4 !== peg$FAILED) {
        s5 = peg$parse_();
        s6 = peg$parseTerm();
        if (s6 !== peg$FAILED) {
          s7 = [];
          s8 = peg$currPos;
          s9 = peg$parse_();
          if (input.charCodeAt(peg$currPos) === 59) {
            s10 = peg$c10;
            peg$currPos++;
          } else {
            s10 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$e13); }
          }
          if (s10 !== peg$FAILED) {
            s11 = peg$parse_();
            s12 = peg$parseTerm();
            if (s12 !== peg$FAILED) {
              s9 = [s9, s10, s11, s12];
              s8 = s9;
            } else {
              peg$currPos = s8;
              s8 = peg$FAILED;
            }
          } else {
            peg$currPos = s8;
            s8 = peg$FAILED;
          }
          while (s8 !== peg$FAILED) {
            s7.push(s8);
            s8 = peg$currPos;
            s9 = peg$parse_();
            if (input.charCodeAt(peg$currPos) === 59) {
              s10 = peg$c10;
              peg$currPos++;
            } else {
              s10 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$e13); }
            }
            if (s10 !== peg$FAILED) {
              s11 = peg$parse_();
              s12 = peg$parseTerm();
              if (s12 !== peg$FAILED) {
                s9 = [s9, s10, s11, s12];
                s8 = s9;
              } else {
                peg$currPos = s8;
                s8 = peg$FAILED;
              }
            } else {
              peg$currPos = s8;
              s8 = peg$FAILED;
            }
          }
          s8 = peg$parse_();
          if (input.charCodeAt(peg$currPos) === 41) {
            s9 = peg$c1;
            peg$currPos++;
          } else {
            s9 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$e1); }
          }
          if (s9 !== peg$FAILED) {
            s2 = [s2, s3, s4, s5, s6, s7, s8, s9];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f13(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseBezug() {
    let s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;

    s0 = peg$currPos;
    s1 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 36) {
      s2 = peg$c11;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e14); }
    }
    if (s2 === peg$FAILED) {
      s2 = '';
    }
    if (s2 !== peg$FAILED) {
      s3 = input.charAt(peg$currPos);
      if (peg$r3.test(s3)) {
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e15); }
      }
      if (s3 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 36) {
          s4 = peg$c11;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e14); }
        }
        if (s4 === peg$FAILED) {
          s4 = '';
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parsePosGanzzahl();
          if (s5 !== peg$FAILED) {
            s6 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 58) {
              s7 = peg$c12;
              peg$currPos++;
            } else {
              s7 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$e16); }
            }
            if (s7 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 36) {
                s8 = peg$c11;
                peg$currPos++;
              } else {
                s8 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$e14); }
              }
              if (s8 === peg$FAILED) {
                s8 = '';
              }
              if (s8 !== peg$FAILED) {
                s9 = input.charAt(peg$currPos);
                if (peg$r3.test(s9)) {
                  peg$currPos++;
                } else {
                  s9 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$e15); }
                }
                if (s9 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 36) {
                    s10 = peg$c11;
                    peg$currPos++;
                  } else {
                    s10 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$e14); }
                  }
                  if (s10 === peg$FAILED) {
                    s10 = '';
                  }
                  if (s10 !== peg$FAILED) {
                    s11 = peg$parsePosGanzzahl();
                    if (s11 !== peg$FAILED) {
                      s7 = [s7, s8, s9, s10, s11];
                      s6 = s7;
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
              } else {
                peg$currPos = s6;
                s6 = peg$FAILED;
              }
            } else {
              peg$currPos = s6;
              s6 = peg$FAILED;
            }
            if (s6 === peg$FAILED) {
              s6 = '';
            }
            if (s6 !== peg$FAILED) {
              s2 = [s2, s3, s4, s5, s6];
              s1 = s2;
            } else {
              peg$currPos = s1;
              s1 = peg$FAILED;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f14(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseWort() {
    let s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = input.charAt(peg$currPos);
    if (peg$r4.test(s2)) {
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e17); }
    }
    if (s2 !== peg$FAILED) {
      s3 = [];
      s4 = input.charAt(peg$currPos);
      if (peg$r5.test(s4)) {
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e18); }
      }
      while (s4 !== peg$FAILED) {
        s3.push(s4);
        s4 = input.charAt(peg$currPos);
        if (peg$r5.test(s4)) {
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e18); }
        }
      }
      s2 = [s2, s3];
      s1 = s2;
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f15(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseFunctionname() {
    let s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = input.charAt(peg$currPos);
    if (peg$r4.test(s2)) {
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e17); }
    }
    if (s2 !== peg$FAILED) {
      s3 = [];
      s4 = input.charAt(peg$currPos);
      if (peg$r5.test(s4)) {
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e18); }
      }
      if (s4 !== peg$FAILED) {
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          s4 = input.charAt(peg$currPos);
          if (peg$r5.test(s4)) {
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$e18); }
          }
        }
      } else {
        s3 = peg$FAILED;
      }
      if (s3 !== peg$FAILED) {
        s2 = [s2, s3];
        s1 = s2;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f16(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parse_() {
    let s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    if (input.charCodeAt(peg$currPos) === 32) {
      s2 = peg$c13;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e19); }
    }
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      if (input.charCodeAt(peg$currPos) === 32) {
        s2 = peg$c13;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e19); }
      }
    }
    peg$savedPos = s0;
    s1 = peg$f17(s1);
    s0 = s1;

    return s0;
  }

  peg$result = peg$startRuleFunction();

  const peg$success = (peg$result !== peg$FAILED && peg$currPos === input.length);
  function peg$throw() {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? peg$getUnicode(peg$maxFailPos) : null,
      peg$maxFailPos < input.length
        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
  if (options.peg$library) {
    return /** @type {any} */ ({
      peg$result,
      peg$currPos,
      peg$FAILED,
      peg$maxFailExpected,
      peg$maxFailPos,
      peg$success,
      peg$throw: peg$success ? undefined : peg$throw,
    });
  }
  if (peg$success) {
    return peg$result;
  } else {
    peg$throw();
  }
}
export default class Sprache{
static parse(input){
  return Sprachepeg$parse(input);
}
static getParser(){
 return this;
}
}