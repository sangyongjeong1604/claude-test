"use client";

import { useState } from "react";

type LoginFormState = {
  email: string;
  password: string;
  isLoading: boolean;
  error: string | null;
};

const initialState: LoginFormState = {
  email: "",
  password: "",
  isLoading: false,
  error: null,
};

export default function LoginForm() {
  const [state, setState] = useState<LoginFormState>(initialState);

  function handleChange(field: keyof Pick<LoginFormState, "email" | "password">) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setState((prev) => ({ ...prev, [field]: e.target.value, error: null }));
    };
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!state.email || !state.password) {
      setState((prev) => ({ ...prev, error: "이메일과 비밀번호를 모두 입력해 주세요." }));
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // TODO: 실제 로그인 API 연동
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("로그인 성공!");
    } catch {
      setState((prev) => ({
        ...prev,
        error: "로그인에 실패했습니다. 다시 시도해 주세요.",
      }));
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }

  return (
    <div className="w-full max-w-md px-6">
      {/* 헤더 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">팀 비용 관리</h1>
        <p className="mt-2 text-sm text-gray-500">계정에 로그인하세요</p>
      </div>

      {/* 카드 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* 에러 메시지 */}
          {state.error && (
            <div
              role="alert"
              className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3"
            >
              {state.error}
            </div>
          )}

          {/* 이메일 */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              placeholder="example@company.com"
              value={state.email}
              onChange={handleChange("email")}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                비밀번호
              </label>
              <a
                href="/forgot-password"
                className="text-xs text-blue-600 hover:text-blue-700 hover:underline"
              >
                비밀번호 찾기
              </a>
            </div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="비밀번호를 입력하세요"
              value={state.password}
              onChange={handleChange("password")}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
            />
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={state.isLoading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {state.isLoading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        {/* 구분선 */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-200" />
          <span className="mx-3 text-xs text-gray-400">또는</span>
          <div className="flex-1 border-t border-gray-200" />
        </div>

        {/* 회원가입 링크 */}
        <p className="text-center text-sm text-gray-500">
          계정이 없으신가요?{" "}
          <a
            href="/register"
            className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
          >
            회원가입
          </a>
        </p>
      </div>
    </div>
  );
}
