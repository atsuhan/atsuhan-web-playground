/**
* src : https://twitter.com/edo_m18/status/1253320259458568193?s=20
**/
#pragma vscode_glsllint_stage : STAGE

precision highp float;
uniform vec2 r;
uniform float t;

void main(){
  vec2
    uv = (gl_FragCoord.xy-.5*r.xy)/40.,
    r=vec2(1.,1.7),
    h=.5*r,
    a=mod(uv,r)-h,
    b=mod(uv-h,r)-h,
    g=dot(a,a)<dot(b,b)?a:b;  
  gl_FragColor += smoothstep(0., .01, .5-g.x) * sin(length((uv - g) * 2.) - t);
}