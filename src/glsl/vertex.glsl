#version 100
precision highp float;

attribute vec3 aPosition;
attribute vec3 aColor;
attribute vec3 aNormal;
attribute vec3 aCenter;
attribute float aDisplacementY;
attribute vec3 aStartPosition;

varying vec3 vColor;
varying vec3 vNormal;
varying vec3 vPosition;
varying mat4 vView;
varying vec3 vAmbient;
varying vec3 vLightPosition;

uniform mat4 uWorld;
uniform mat4 uView;
uniform mat4 uProjection;
uniform mat3 uNormal;
uniform float uTime;
uniform float uDisplacementY;
uniform float uExplosion;
uniform vec3 uLightPosition;

const float pi = 3.14159;
const float waveLengthX = 0.1;
const float waveLengthZ = 0.1;
const float waveHeightX = 2.0;
const float waveHeightZ = 2.0;
const float ambientStrength = 0.1;
 
void main() {
    vec3 position = aPosition;

    position.y = position.y + (uExplosion) * (
        sin(uTime + aCenter.x * waveLengthX) * waveHeightX - waveHeightX
        + cos(uTime + aCenter.z * waveLengthZ) * waveHeightZ - waveHeightZ
        + uDisplacementY * aDisplacementY * 20.0)
        + sin(uExplosion * pi) * aDisplacementY * 20.0
        + sin((1.0) * pi) * aDisplacementY * 20.0;

    position.x = (1.0 - uExplosion ) * aStartPosition.x
        + (uExplosion) * aPosition.x;
    position.z = (1.0 - uExplosion ) * aStartPosition.z
        + (uExplosion) * aPosition.z;

    vColor = aColor;
    vPosition = (uView * vec4((uWorld * vec4(position, 1.0)).xyz, 1.0)).xyz;
    vNormal = normalize(mat3(uView) * uNormal * aNormal);
    vLightPosition = (uView * vec4(uLightPosition, 1.0)).xyz;

    // ambient component
    vec3 lightColor = vec3(1.0, 1.0, 1.0);
    vAmbient = ambientStrength * lightColor;

    gl_Position = uProjection * uView * uWorld * vec4(position, 1.0);
}