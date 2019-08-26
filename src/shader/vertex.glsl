#version 100
precision highp float;

attribute vec3 aPosition;
attribute vec3 aColor;
attribute vec3 aNormal;
attribute vec3 aCenter;
attribute float aSpecialY0;
attribute float aSpecialY1;
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
uniform float uInterpolator0;
uniform float uInterpolator1;
uniform float uInterpolator2;
uniform vec3 uLightPosition;

void main() {
    vec3 position = aPosition;
    float waveLengthX = 0.1;
    float waveLengthZ = 0.1;
    float waveHeightX = 2.0;
    float waveHeightZ = 2.0;

    position.y = position.y + uInterpolator2 * (
        sin(uTime + aCenter.x * waveLengthX) * waveHeightX - waveHeightX
        + cos(uTime + aCenter.z * waveLengthZ) * waveHeightZ - waveHeightZ
        + uInterpolator0 * aSpecialY0 * 20.0
        + uInterpolator1 * aSpecialY1 * 20.0);

    position.x = (1.0 - uInterpolator2) * aStartPosition.x
        + uInterpolator2 * aPosition.x;
    position.z = (1.0 - uInterpolator2) * aStartPosition.z
        + uInterpolator2 * aPosition.z;

    vColor = aColor;
    vPosition = (uView * vec4((uWorld * vec4(position, 1.0)).xyz, 1.0)).xyz;
    vNormal = normalize(mat3(uView) * uNormal * aNormal);
    vLightPosition = (uView * vec4(uLightPosition, 1.0)).xyz;

    // ambient component
    float ambientStrength = 0.1;
    vec3 lightColor = vec3(1.0, 1.0, 1.0);
    vAmbient = ambientStrength * lightColor;

    gl_Position = uProjection * uView * uWorld * vec4(position, 1.0);
}