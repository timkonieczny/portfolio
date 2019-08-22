#version 100
precision mediump float;

attribute vec3 aPosition;
attribute vec3 aColor;
attribute vec3 aNormal;
attribute vec3 aCenter;
varying vec3 vColor;
varying vec3 vNormal;
varying vec3 vPosition;
varying mat4 vView;
uniform mat4 uWorld;
uniform mat4 uView;
uniform mat4 uProjection;
uniform mat3 uNormal;
uniform float uTime;

void main() {
    vColor = aColor;
    vNormal = uNormal * aNormal;
    vPosition = (uWorld * vec4(aPosition, 1.0)).xyz;
    vec3 position = aPosition;
    float waveLengthX = 0.1;
    float waveLengthZ = 0.1;
    float waveHeightX = 2.0;
    float waveHeightZ = 2.0;

    position.y = position.y + sin(uTime + aCenter.x * waveLengthX) * waveHeightX - waveHeightX;
    position.y = position.y + cos(uTime + aCenter.z * waveLengthZ) * waveHeightZ - waveHeightZ;
    gl_Position = uProjection * uView * uWorld * vec4(position, 1.0);
}