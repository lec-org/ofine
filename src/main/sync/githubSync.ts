import { app } from 'electron'
import { join } from 'path'
import simpleGit from 'simple-git'
import fsExtra from 'fs-extra'
import * as Y from 'yjs'

/**
 * 设置同步仓库路径
 */
const getConfigRepoPath = () => {
  return ''
}
/*
 *初始化 github 仓库
 */
async function initialization(repoUrl: string): Promise<boolean> {
  const repoPath = getConfigRepoPath()
  const git = simpleGit(repoPath)

  try {
    if (await fsExtra.pathExists(repoPath)) {
      // 仓库存在，拉取最新
      await git.cwd(repoPath).pull()
    } else {
      // 仓库不存在，克隆
      await git.clone(repoUrl, repoPath)
    }
    return true
  } catch (error) {
    console.error('初始化仓库失败:', error)
    return false
  }
}

/**
 * 解决 CRDT 冲突合并
 */
async function mergeCRDTChanges(fileName: string, localState: Uint8Array): Promise<Uint8Array> {
  const repoPath = getConfigRepoPath()
  const remoteStatePath = join(repoPath, 'files', `${fileName}.ydoc`)

  try {
    // 如果远程存在该文件的状态，进行合并
    if (await fsExtra.pathExists(remoteStatePath)) {
      const remoteState = await fsExtra.readFile(remoteStatePath)

      // 创建Yjs文档进行合并
      const localDoc = new Y.Doc()
      const remoteDoc = new Y.Doc()

      // 应用状态
      Y.applyUpdate(localDoc, localState)
      Y.applyUpdate(remoteDoc, remoteState)

      // 合并文档
      const mergedDoc = new Y.Doc()
      Y.applyUpdate(mergedDoc, Y.encodeStateAsUpdate(localDoc))
      Y.applyUpdate(mergedDoc, Y.encodeStateAsUpdate(remoteDoc))

      // 返回合并后的状态
      return Y.encodeStateAsUpdate(mergedDoc)
    }
    // 如果远程不存在，返回本地状态
    return localState
  } catch (error) {
    console.error('合并 CRDT 状态失败:', error)
    return localState
  }
}
