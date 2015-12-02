/*
 * Text to password
 * Version 0.1.0 Copyright (c) 2015 Xiao Hui <xhui.xiao@gmail.com>
 * Distributed under the MIT License
 */

 function text2password(text, length, number, letter, capital, special)
 {
    if (!text) return;
    if (length < 0 || length > 16) return;

    var m = hex_md5(text);
    console.log(m);
    var p = new Array(length)
    for (var i = 0; i < length; i++)
    {
        p[i] = 0;
        for (var j = i; j < 32; j+=length)
        {
            p[i] += parseInt(m[j], 16);
        }
    }

    var types = [], nt=0, n=0, l=0, c=0, s=0;
    number && (n++, types.push({ value:n, map:map_number }));
    letter && (l++, types.push({ value:l, map:map_letter }));
    capital && (c++, types.push({ value:c, map:map_captial}));
    special && (s++, types.push({ value:s, map:map_special}));
    nt = n + l + c + s;
    if(nt === 0) {n++, types.push({value:n, map:map_number}), nt++;} /* 默认全数字 */

    for (i=0; i<length-nt; i++)
    {
        var t = types[parseInt(m[((i+1)*17)%32], 16) % nt];
        t.value++;
    }

    for (i=0; i<length; i++)
    {
        var t = types[p[i] % nt];
        if (t.value >= 0) {
            p[i] = t.map(parseInt(p[i]));
            t.value--;
            if (t.value == 0) {
                types.splice(types.indexOf(t), 1);
                nt--;
            }
        }
    }

    return p.join("");
 }

 function map_number(v)
 {
    var ss = '0123456789';
    return ss[v % ss.length];
 }

 function map_letter(v)
 {
    var ss = "abcdefghijklmnopqrstuvwxyz";
    return ss[v % ss.length];
 }

 function map_captial(v)
 {
    var ss = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return ss[v % ss.length];
 }

 function map_special(v)
 {
    var ss = "!@#$%";
    return ss[v % ss.length];
 }
