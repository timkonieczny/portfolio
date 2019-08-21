#version 100
precision mediump float;

attribute vec3 vertPosition;
attribute vec3 vertColor;
attribute vec3 vertNormal;
attribute vec3 vertCenter;
varying vec3 fragColor;
varying vec3 fragNormal;
varying vec3 fragPos;
uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;

uniform mat3 mNorm;

uniform float time;

void main() {
    fragColor = vertColor;
    fragNormal = mNorm * vertNormal;

    fragPos = (mWorld * vec4(vertPosition, 1.0)).xyz;
    vec3 position = vertPosition;
    position.y = position.y + sin(time + vertCenter.x) - 1.0;    // TODO: add animation in z direction      
    gl_Position = mProj * mView * mWorld * vec4(position, 1.0);
}